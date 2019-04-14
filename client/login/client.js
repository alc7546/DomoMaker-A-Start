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
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/>
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign in"/>
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
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/>
        <label htmlFor="pass">Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/>
        <label htmlFor="pass2">Password: </label>
        <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign Up"/>

        </form>
    );
};

const AboutWindow = () => {
    return(
        <div id = "wrapper">
        <div id="sideContent">
            <h2>About This Project</h2>
            <h4>This is a brief description of my next project</h4>
            <p>This is a static page that will eventually detail 
                my project and the process I took to complete it
            </p>
            <p>Here I'll outline how I did the project, what challenges and problems I faced
                and how I went about solving them. <br></br>I'll also likely throw a prototype image in 
                to show how progress developed.
            </p>
            <ul>
                <li>Example Step One</li>
                <li>Example Step Two</li>
                <li>I'll also be using either Bootstrap or Bulma for styling, and SASS so I don't hate myself</li>
            </ul>
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

