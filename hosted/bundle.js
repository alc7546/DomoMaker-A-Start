"use strict";

var handleDomo = function handleDomo(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoLevel").val() == '') {
        handleError("ROAR! All fields are required!");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};

var handlePasswordChange = function handlePasswordChange(e) {
    e.preventDefault();

    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#user").val() == '' || $("#oldPassword").val() == '' || $("#newPass1").val() == '' || $("#newPass2").val() == '') {
        handleError("All fields are required!");
        return false;
    }

    if ($("#newPass1").val() !== $("#newPass2").val()) {
        handleError("Passwords do not match!");
        return false;
    }

    sendAjax('POST', $("#passwordChangeForm").attr("action"), $("#passwordChangeForm").serialize(), redirect);

    return false;
};

var DomoForm = function DomoForm(props) {
    return React.createElement(
        "form",
        { id: "domoForm",
            onSubmit: handleDomo,
            name: "domoForm",
            action: "/maker",
            method: "POST",
            className: "domoForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Age: "
        ),
        React.createElement("input", { id: "domoAge", type: "number", min: "1", name: "age", placeholder: "Domo Age" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Level: "
        ),
        React.createElement("input", { id: "domoLevel", type: "number", min: "1", name: "level", placeholder: "Domo Level" }),
        React.createElement(
            "label",
            { htmlFor: "race" },
            "Race: "
        ),
        React.createElement("input", { id: "charRace", type: "text", name: "race", placeholder: "Character Race" }),
        React.createElement(
            "label",
            { htmlFor: "health" },
            "Health: "
        ),
        React.createElement("input", { id: "charHealth", type: "number", min: "0", name: "health", placeholder: "Character Health" }),
        React.createElement(
            "label",
            { htmlFor: "armor" },
            "Armor: "
        ),
        React.createElement("input", { id: "charArmor", type: "number", min: "0", name: "armor", placeholder: "Character Armor" }),
        React.createElement(
            "label",
            { htmlFor: "gold" },
            "Gold: "
        ),
        React.createElement("input", { id: "charGold", type: "number", min: "0", name: "gold", placeholder: "Character Gold" }),
        React.createElement(
            "label",
            { htmlFor: "strength" },
            "Strength: "
        ),
        React.createElement("input", { id: "charStrength", type: "number", min: "0", name: "strength", placeholder: "Character Strength" }),
        React.createElement(
            "label",
            { htmlFor: "agility" },
            "Agility: "
        ),
        React.createElement("input", { id: "charAgility", type: "number", min: "0", name: "agility", placeholder: "Character Agility" }),
        React.createElement(
            "label",
            { htmlFor: "wisdom" },
            "Wisdom: "
        ),
        React.createElement("input", { id: "charWisdom", type: "number", min: "0", name: "wisdom", placeholder: "Character Wisdom" }),
        React.createElement(
            "label",
            { htmlFor: "endurance" },
            "Endurance: "
        ),
        React.createElement("input", { id: "charEndurance", type: "number", min: "0", name: "endurance", placeholder: "Character Endurance" }),
        React.createElement(
            "label",
            { htmlFor: "defense" },
            "Defense: "
        ),
        React.createElement("input", { id: "charDefense", type: "number", min: "0", name: "defense", placeholder: "Character Defense" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
    );
};

var PassWordWindow = function PassWordWindow(props) {
    return React.createElement(
        "form",
        { id: "passwordChangeForm",
            name: "passwordChangeForm",
            onSubmit: handlePasswordChange,
            action: "/passwordChange",
            method: "POST",
            className: "mainForm"
        },
        React.createElement(
            "label",
            { htmlFor: "username" },
            "Username: "
        ),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement(
            "label",
            { htmlFor: "pass" },
            "Old Password: "
        ),
        React.createElement("input", { id: "oldPassword", type: "password", name: "pass", placeholder: "old password" }),
        React.createElement(
            "label",
            { htmlFor: "pass1" },
            "New Password: "
        ),
        React.createElement("input", { id: "newPass1", type: "password", name: "pass1", placeholder: "new password" }),
        React.createElement(
            "label",
            { htmlFor: "pass2" },
            "Retype New Password: "
        ),
        React.createElement("input", { id: "newPass2", type: "password", name: "pass2", placeholder: "retype password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign Up" })
    );
};

var DomoList = function DomoList(props) {
    if (props.domos.length === 0) {
        return React.createElement(
            "div",
            { className: "domoList" },
            React.createElement(
                "h3",
                { className: "emptyDomo" },
                "No Domos yet"
            )
        );
    }

    var domoNodes = props.domos.map(function (domo) {
        return React.createElement(
            "div",
            { key: domo._id, className: "domo" },
            React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
            React.createElement(
                "h3",
                { className: "domoName" },
                "Name: ",
                domo.name,
                " "
            ),
            React.createElement(
                "h3",
                { className: "domoAge" },
                "Age: ",
                domo.age,
                " "
            ),
            React.createElement(
                "h3",
                { className: "domoLevel" },
                "Level: ",
                domo.level
            ),
            React.createElement(
                "h3",
                { className: "charRace" },
                "Race: ",
                domo.race
            ),
            React.createElement(
                "h3",
                { className: "charHealth" },
                "Health: ",
                domo.health
            ),
            React.createElement(
                "h3",
                { className: "charArmor" },
                "Armor: ",
                domo.armor
            ),
            React.createElement(
                "h3",
                { className: "charGold" },
                "Gold: ",
                domo.gold
            ),
            React.createElement(
                "h3",
                { className: "charStrength" },
                "Strength: ",
                domo.strength
            ),
            React.createElement(
                "h3",
                { className: "charAgility" },
                "Agility: ",
                domo.agility
            ),
            React.createElement(
                "h3",
                { className: "charWisdom" },
                "Wisdom: ",
                domo.wisdom
            ),
            React.createElement(
                "h3",
                { className: "charEndurance" },
                "Endurance: ",
                domo.endurance
            ),
            React.createElement(
                "h3",
                { className: "charDefense" },
                "Defense: ",
                domo.defense
            )
        );
    });

    return React.createElement(
        "div",
        { className: "domoList" },
        domoNodes
    );
};

var loadDomosFromServer = function loadDomosFromServer() {
    sendAjax('GET', '/getDomos', null, function (data) {
        ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
    });
};

var createPasswordWindow = function createPasswordWindow(csrf) {
    ReactDOM.render(React.createElement(PassWordWindow, { csrf: csrf }), document.querySelector("#domos"));
};

var setup = function setup(csrf) {
    var passwordButton = document.querySelector("#passwordButton");

    passwordButton.addEventListener("click", function (e) {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });

    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#makeDomo"));

    ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

    loadDomosFromServer();
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
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#domoMessage").animate({ width: 'hide' }, 350);
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
