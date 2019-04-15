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
                "While this app still has a long way to go, you can begin creating characters with a moderate amount of stats and customization."
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
                "While this app still has a long way to go, you can begin creating characters with a moderate amount of stats and customization."
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
                "I created this project as I have recently gotten into playing role-playing games and found the stat management among the most interesting aspects of the genre."
            ),
            React.createElement(
                "p",
                null,
                "I decided to break down what I believed were common factors or attributes for a role-playing character.",
                React.createElement("br", null),
                "I then used MongoDB to store these values, allowing users to build up a list of their customized characters."
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
                    "No project (of mine at least) is without some shortcomings. Due to some programming issues, time management, and hectic classes, I didn't accomplish all I had hoped.",
                    React.createElement("br", null),
                    "I'll likely revisit this project for the third project, and accomplish some of these goals."
                ),
                React.createElement(
                    "li",
                    null,
                    "Restyle the project further."
                ),
                React.createElement(
                    "li",
                    null,
                    "Implement custom template themes."
                ),
                React.createElement(
                    "li",
                    null,
                    "Allow for editing of the characters."
                ),
                React.createElement(
                    "li",
                    null,
                    "Allow for deleting of characters."
                )
            ),
            React.createElement(
                "h4",
                null,
                "Resources Used"
            ),
            React.createElement(
                "a",
                { href: "https://codepen.io/madshaakansson/pen/iqDsG?editors=1100" },
                "Text Transition CSS"
            ),
            React.createElement("br", null),
            React.createElement(
                "a",
                { href: "https://freefrontend.com/css-button-hover-effects/" },
                "Button/Border CSS"
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

var setup = function setup(csrf) {
    var loginButton = document.querySelector("#loginButton");
    var signupButton = document.querySelector("#signupButton");
    var aboutButton = document.querySelector("#aboutButton");

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
