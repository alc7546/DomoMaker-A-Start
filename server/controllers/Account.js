const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

    // force cast strings to cover some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

    // check to make sure both exist
  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);
    return res.json({ redirect: '/maker' });
  });
};

// Change password
const passwordChange = (request, response) => {
  const req = request;
  const res = response;

  // force cast strings to cover security flaws
  const username = `${req.body.username}`;
  const oldPassword = `${req.body.pass}`;
  const newPass1 = `${req.body.pass1}`;
  const newPass2 = `${req.body.pass2}`;

  if (!oldPassword || !newPass1 || !newPass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (newPass1 !== newPass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  return Account.AccountModel.authenticate(username, oldPassword, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Current password is wrong' });
    }

    return Account.AccountModel.generateHash(newPass1, (salt, hash) => {
      Account.AccountModel.findByUsername(username, (error, doc) => {
        if (error) {
          return res.status(400).json({ error: 'An unexpected error occurred.' });
        }

        if (!doc) {
          return res.status(400).json({ error: 'Account does not exist.' });
        }

        const currentAccount = doc;
        currentAccount.salt = salt;
        currentAccount.password = hash;

        const savePromise = currentAccount.save();

        savePromise.then(() => {
          req.session.account = Account.AccountModel.toAPI(currentAccount);
          return res.json({ redirect: '/maker' });
        });
        return false;
      }); // end find by username
    }); // end generateHash
  }); // end authenticate
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }
      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.passwordChange = passwordChange;
module.exports.getToken = getToken;

