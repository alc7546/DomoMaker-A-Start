const models = require('../models');

const Character = models.Character;

const makerPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};


const makeCharacter = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required!' });
  }

  const characterData = {
    name: req.body.name,
    age: req.body.age,
    level: req.body.level,
    race: req.body.race,
    health: req.body.health,
    armor: req.body.armor,
    gold: req.body.gold,
    strength: req.body.strength,
    agility: req.body.agility,
    wisdom: req.body.wisdom,
    endurance: req.body.endurance,
    defense: req.body.defense,
    owner: req.session.account._id,
  };

  const newCharacter = new Character.CharacterModel(characterData);

  const characterPromise = newCharacter.save();

  characterPromise.then(() => res.json({ redirect: '/maker' }));

  characterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return characterPromise;
};

const getCharacters = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ characters: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getCharacters = getCharacters;
module.exports.make = makeCharacter;
