"use strict";

var handleCharacter = function handleCharacter(e) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);

    if ($("#characterName").val() == '' || $("#characterAge").val() == '' || $("#characterLevel").val() == '') {
        handleError("All fields are required!");
        return false;
    }

    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function () {
        loadCharactersFromServer();
    });

    return false;
};

var handlePasswordChange = function handlePasswordChange(e) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);

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

var CharacterForm = function CharacterForm(props) {
    return React.createElement(
        "form",
        { id: "characterForm",
            onSubmit: handleCharacter,
            name: "characterForm",
            action: "/maker",
            method: "POST",
            className: "characterForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "charName", type: "text", name: "name", placeholder: "Character Name" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Age: "
        ),
        React.createElement("input", { id: "charAge", type: "number", min: "1", name: "age", placeholder: "Character Age" }),
        React.createElement(
            "label",
            { htmlFor: "level" },
            "Level: "
        ),
        React.createElement("input", { id: "charLevel", type: "number", min: "1", name: "level", placeholder: "Character Level" }),
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
        React.createElement("input", { className: "makeCharacterSubmit", type: "submit", value: "Make Character" })
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

var CharacterList = function CharacterList(props) {
    if (props.characters.length === 0) {
        return React.createElement(
            "div",
            { className: "characterList" },
            React.createElement(
                "h3",
                { className: "emptyCharacter" },
                "No Characters yet"
            )
        );
    }

    var characterNodes = props.characters.map(function (character) {
        return React.createElement(
            "div",
            { key: character._id, className: "character" },
            React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "character face", className: "characterFace" }),
            React.createElement(
                "h3",
                { className: "charName" },
                "Name: ",
                character.name,
                " "
            ),
            React.createElement(
                "h3",
                { className: "charAge" },
                "Age: ",
                character.age,
                " "
            ),
            React.createElement(
                "h3",
                { className: "charLevel" },
                "Level: ",
                character.level
            ),
            React.createElement(
                "h3",
                { className: "charRace" },
                "Race: ",
                character.race
            ),
            React.createElement(
                "h3",
                { className: "charHealth" },
                "Health: ",
                character.health
            ),
            React.createElement(
                "h3",
                { className: "charArmor" },
                "Armor: ",
                character.armor
            ),
            React.createElement(
                "h3",
                { className: "charGold" },
                "Gold: ",
                character.gold
            ),
            React.createElement(
                "h3",
                { className: "charStrength" },
                "Strength: ",
                character.strength
            ),
            React.createElement(
                "h3",
                { className: "charAgility" },
                "Agility: ",
                character.agility
            ),
            React.createElement(
                "h3",
                { className: "charWisdom" },
                "Wisdom: ",
                character.wisdom
            ),
            React.createElement(
                "h3",
                { className: "charEndurance" },
                "Endurance: ",
                character.endurance
            ),
            React.createElement(
                "h3",
                { className: "charDefense" },
                "Defense: ",
                character.defense
            )
        );
    });

    return React.createElement(
        "div",
        { className: "characterList" },
        characterNodes
    );
};

var loadCharactersFromServer = function loadCharactersFromServer() {
    sendAjax('GET', '/getCharacters', null, function (data) {
        ReactDOM.render(React.createElement(CharacterList, { characters: data.character }), document.querySelector("#characters"));
    });
};

var createPasswordWindow = function createPasswordWindow(csrf) {
    ReactDOM.render(React.createElement(PassWordWindow, { csrf: csrf }), document.querySelector("#characters"));
};

var setup = function setup(csrf) {
    var passwordButton = document.querySelector("#passwordButton");

    passwordButton.addEventListener("click", function (e) {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });

    ReactDOM.render(React.createElement(CharacterForm, { csrf: csrf }), document.querySelector("#makeCharacter"));

    ReactDOM.render(React.createElement(CharacterList, { characters: [] }), document.querySelector("#characters"));

    loadCharactersFromServer();
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
