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
        React.createElement("label", { htmlFor: "username" }),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "Username" }),
        React.createElement("label", { htmlFor: "pass" }),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "Password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign in" })
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
        React.createElement("label", { htmlFor: "username" }),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "Username" }),
        React.createElement("label", { htmlFor: "pass" }),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "Password" }),
        React.createElement("label", { htmlFor: "pass2" }),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "Retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign Up" })
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
                "This is a brief description of my next project"
            ),
            React.createElement(
                "p",
                null,
                "This is a static page that will eventually detail my project and the process I took to complete it"
            ),
            React.createElement(
                "p",
                null,
                "Here I'll outline how I did the project, what challenges and problems I faced and how I went about solving them. ",
                React.createElement("br", null),
                "I'll also likely throw a prototype image in to show how progress developed."
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "li",
                    null,
                    "Example Step One"
                ),
                React.createElement(
                    "li",
                    null,
                    "Example Step Two"
                ),
                React.createElement(
                    "li",
                    null,
                    "I'll also be using either Bootstrap or Bulma for styling, and SASS so I don't hate myself"
                )
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
