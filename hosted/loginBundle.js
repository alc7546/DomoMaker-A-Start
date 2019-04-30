"use strict";

var handleLogin = function handleLogin(e) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty!");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

var handleSignup = function handleSignup(e) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match!");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        "form",
        { id: "loginForm",
            name: "loginForm",
            onSubmit: handleLogin,
            action: "/login",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Continue Your Adventure!"
            ),
            React.createElement(
                "p",
                null,
                "Welcome traveler! Create new characters for your tabletop adventures!",
                React.createElement("br", null),
                "This app is still on its own journey, but enjoy what it has to offer so far!"
            )
        ),
        React.createElement("label", { htmlFor: "username" }),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "Username" }),
        React.createElement("label", { htmlFor: "pass" }),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "Password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement(
            "button",
            { "data-hover": "Let's Go!", className: "formSubmit", type: "submit" },
            React.createElement(
                "div",
                null,
                "Login"
            )
        )
    );
};

var SignupWindow = function SignupWindow(props) {
    return React.createElement(
        "form",
        { id: "signupForm",
            name: "signupForm",
            onSubmit: handleSignup,
            action: "/signup",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Begin Your Adventure!"
            ),
            React.createElement(
                "p",
                null,
                "Welcome traveler! Create new characters for your tabletop adventures!",
                React.createElement("br", null),
                "This app is still on its own journey, but enjoy what it has to offer so far!"
            )
        ),
        React.createElement("label", { htmlFor: "username" }),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "Username" }),
        React.createElement("label", { htmlFor: "pass" }),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "Password" }),
        React.createElement("label", { htmlFor: "pass2" }),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "Retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement(
            "button",
            { "data-hover": "Let's Go!", className: "formSubmit", type: "submit" },
            React.createElement(
                "div",
                null,
                "Sign Up"
            )
        )
    );
};

var AboutWindow = function AboutWindow() {
    return React.createElement(
        "div",
        { id: "wrapper" },
        React.createElement(
            "div",
            { id: "sideContent" },
            React.createElement(
                "h2",
                null,
                "About This Project"
            ),
            React.createElement(
                "h4",
                null,
                "Character Maker Development"
            ),
            React.createElement(
                "p",
                null,
                "I created this project as I have recently gotten into playing role-playing games and found the stat management among the most interesting aspects of the genre. ",
                React.createElement("br", null),
                "It has also gotten me interested in tabletop games, but I've yet to actually play those."
            ),
            React.createElement(
                "p",
                null,
                "I decided to break down what I believed were common factors or attributes for a role-playing character.",
                React.createElement("br", null),
                "I then used MongoDB to store these values, allowing users to build up a list of their customized characters.",
                React.createElement("br", null),
                "The project is built with React and Handlebars to handle updates of dynamic content."
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "h4",
                    null,
                    "Shortcomings"
                ),
                React.createElement(
                    "p",
                    null,
                    "The final project still has some shortcomings. All of the basic functionality is present, but I missed out on the stretch goals of",
                    React.createElement("br", null),
                    "implenting custom templates. I also used pure CSS for styling and not a framework, which while it was fun to explore different tutorials, ",
                    React.createElement("br", null),
                    "the site itself is not responsive."
                ),
                React.createElement(
                    "h4",
                    null,
                    "What I'd do with more time"
                ),
                React.createElement(
                    "li",
                    null,
                    "- Restyle the project further with a framework for responsve design."
                ),
                React.createElement(
                    "li",
                    null,
                    "- Implement custom template themes."
                ),
                React.createElement(
                    "li",
                    null,
                    "- Hook up an email subscription list"
                )
            )
        )
    );
};

var ResourcesWindow = function ResourcesWindow() {
    return React.createElement(
        "div",
        { id: "wrapper" },
        React.createElement(
            "div",
            { id: "sideContent" },
            React.createElement(
                "h2",
                null,
                "Resources Used"
            ),
            React.createElement(
                "a",
                { href: "https://codepen.io/madshaakansson/pen/iqDsG?editors=1100" },
                "Text Submission Movement - CSS"
            ),
            React.createElement("br", null),
            React.createElement(
                "a",
                { href: "https://freefrontend.com/css-button-hover-effects/" },
                "Form Button Border Animations - CSS"
            ),
            React.createElement("br", null),
            React.createElement(
                "a",
                { href: "https://codepen.io/Emanuel_G/pen/YVJOZo" },
                "Navbar Button Animations - CSS"
            ),
            React.createElement("br", null),
            React.createElement(
                "a",
                { href: "https://fonts.googleapis.com/css?family=Lato" },
                "Font Family Used: Lato"
            ),
            React.createElement("br", null),
            React.createElement(
                "a",
                { href: "https://www.deviantart.com/turtlegirlman/art/d20-icon-de-la-Gartoon-60651092" },
                "Main Dice Picture"
            ),
            React.createElement("br", null),
            React.createElement(
                "a",
                { href: "https://www.imagenesmy.com/imagenes/dungeon-icon-3e.html" },
                "Favicon Image"
            ),
            React.createElement("br", null),
            React.createElement(
                "a",
                { href: "https://webiconspng.com/wp-content/uploads/2017/01/Red-Trash-Simple-Icon.png" },
                "Red Trash Symbol"
            ),
            React.createElement(
                "p",
                null,
                "The other icons were derived from a variety of free use icon sites or icon archives. Explicit credit can be provided if requested."
            )
        )
    );
};

var createLoginWindow = function createLoginWindow(csrf) {
    ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
    ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createAboutWindow = function createAboutWindow() {
    ReactDOM.render(React.createElement(AboutWindow, null), document.querySelector("#content"));
};

var createResourceWindow = function createResourceWindow() {
    ReactDOM.render(React.createElement(ResourcesWindow, null), document.querySelector("#content"));
};

var setup = function setup(csrf) {
    var loginButton = document.querySelector("#loginButton");
    var signupButton = document.querySelector("#signupButton");
    var aboutButton = document.querySelector("#aboutButton");
    var resourceButton = document.querySelector("#resourceButton");

    signupButton.addEventListener("click", function (e) {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    aboutButton.addEventListener("click", function (e) {
        e.preventDefault();
        createAboutWindow();
        return false;
    });

    resourceButton.addEventListener("click", function (e) {
        e.preventDefault();
        createResourceWindow();
        return false;
    });

    createLoginWindow(csrf);
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#characterMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#characterMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
