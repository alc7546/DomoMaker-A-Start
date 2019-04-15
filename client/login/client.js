const handleLogin = (e) => {
    e.preventDefault();

    $("#characterMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == ''){
        handleError("Username or password is empty!");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    $("#characterMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords do not match!");
        return false;
    } 

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};





const LoginWindow = (props) => {
    return(
        <form id="loginForm" 
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
        <div>
            <h3>Continue Your Adventure!</h3>
            <p>
                Welcome traveler! Create new characters for your tabletop adventures! 
                <br></br>
                While this app still has a long way to go, you can begin creating characters
                with a moderate amount of stats and customization.
            </p>
        </div>
        <label htmlFor="username"></label>
        <input id="user" type="text" name="username" placeholder="Username"/>
        <label htmlFor="pass"></label>
        <input id="pass" type="password" name="pass" placeholder="Password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button data-hover="Let's Go!" className="formSubmit" type="submit"><div>Login</div></button>
        </form>
    );
};

const SignupWindow = (props) => {
    return(
        <form id="signupForm"
            name="signupForm" 
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
        <div>
            <h3>Begin Your Adventure!</h3>
            <p>
                Welcome traveler! Create new characters for your tabletop adventures! 
                <br></br>
                While this app still has a long way to go, you can begin creating characters
                with a moderate amount of stats and customization.
            </p>
        </div>
        <label htmlFor="username"></label>
        <input id="user" type="text" name="username" placeholder="Username"/>
        <label htmlFor="pass"></label>
        <input id="pass" type="password" name="pass" placeholder="Password"/>
        <label htmlFor="pass2"></label>
        <input id="pass2" type="password" name="pass2" placeholder="Retype password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button data-hover="Let's Go!" className="formSubmit" type="submit"><div>Sign Up</div></button>

        </form>
    );
};

const AboutWindow = () => {
    return(
        <div id = "wrapper">
        <div id="sideContent">
            <h2>About This Project</h2>
            <h4>Character Maker Development</h4>
            <p>I created this project as I have recently gotten into
                playing role-playing games and found the stat management 
                among the most interesting aspects of the genre.
            </p>
            <p>I decided to break down what I believed were common factors or attributes
                for a role-playing character.<br></br>I then used MongoDB to store these values,
                allowing users to build up a list of their customized characters.
            </p>
            <ul>
                <h4>Shortcomings</h4>
                <p>No project (of mine at least) is without some shortcomings. Due to some
                    programming issues, time management, and hectic classes, I didn't accomplish all I had hoped.<br></br>
                    I'll likely revisit this project for the third project, and accomplish some of these goals.
                </p>
                <li>Restyle the project further.</li>
                <li>Implement custom template themes.</li>
                <li>Allow for editing of the characters.</li>
                <li>Allow for deleting of characters.</li>
            </ul>
            <h4>Resources Used</h4>
            <a href="https://codepen.io/madshaakansson/pen/iqDsG?editors=1100">Text Transition CSS</a>
            <br></br>
            <a href="https://freefrontend.com/css-button-hover-effects/">Button/Border CSS</a>
        </div>
        </div>
    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")      
    ); 
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createAboutWindow = () => {
    ReactDOM.render(
        <AboutWindow />,
        document.querySelector("#content")
    );
};



const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const aboutButton = document.querySelector("#aboutButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    aboutButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAboutWindow();
        return false;
    });

    createLoginWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});

