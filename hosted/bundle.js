"use strict";

var handleCharacter = function handleCharacter(e) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);

    if ($("#characterName").val() == '' || $("#characterAge").val() == '' || $("#characterLevel").val() == '') {
        handleError("All fields are required!");
        return false;
    }

    var form = document.querySelector("#characterForm");
    var csrf = form.querySelector("#csrf").value;
    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function () {
        loadCharactersFromServer(csrf);
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

var handleDelete = function handleDelete(e, identifier) {
    e.preventDefault();

    $("#characterMessage").animate({ width: 'hide' }, 350);
    console.log(identifier);
    console.log(identifier._csrf);
    sendAjax('POST', "/deleteCharacter", identifier, redirect);
    loadCharactersFromServer(identifier._csrf);
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
        React.createElement("input", { type: "hidden", id: "csrf", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeCharacterSubmit", type: "submit", value: "Make Character" })
    );
};

var UpgradeWindow = function UpgradeWindow() {
    return React.createElement(
        "div",
        { id: "upgradeContainer" },
        React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Unlock New Templates!"
            ),
            React.createElement(
                "p",
                null,
                "This app, and this feature are a work in progress!"
            ),
            React.createElement(
                "p",
                null,
                "In the future, you will be able to buy new themed templates to create unique characters from your favorite movies, shows, or games!"
            )
        ),
        React.createElement(
            "ul",
            null,
            React.createElement(
                "div",
                { id: "row1" },
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { className: "upgradeButton", id: "starWars", href: "#", onClick: function onClick() {
                                return alert("You have preordered the Star Wars Sheet");
                            } },
                        "Star Wars Upgrade"
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { className: "upgradeButton", id: "destiny", href: "#", onClick: function onClick() {
                                return alert("You have preordered the Destiny Sheet");
                            } },
                        "Destiny Upgrade"
                    )
                )
            ),
            React.createElement(
                "div",
                { id: "row2" },
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { className: "upgradeButton", id: "starTrek", href: "#", onClick: function onClick() {
                                return alert("You have preordered the Star Trek Sheet");
                            } },
                        "Star Trek Upgrade"
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { className: "upgradeButton", id: "marvel", href: "#", onClick: function onClick() {
                                return alert("You have preordered the Marvel Sheet");
                            } },
                        "Marvel Upgrade"
                    )
                )
            )
        )
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
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Change Your Password!"
            ),
            React.createElement(
                "p",
                null,
                "Feeling unsafe? Got a weird email? Keep your account secure and change your password."
            )
        ),
        React.createElement("label", { htmlFor: "username" }),
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "Username" }),
        React.createElement("label", { htmlFor: "pass" }),
        React.createElement("input", { id: "oldPassword", type: "password", name: "pass", placeholder: "Old Password" }),
        React.createElement("label", { htmlFor: "pass1" }),
        React.createElement("input", { id: "newPass1", type: "password", name: "pass1", placeholder: "New Password" }),
        React.createElement("label", { htmlFor: "pass2" }),
        React.createElement("input", { id: "newPass2", type: "password", name: "pass2", placeholder: "Retype Password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement(
            "button",
            { "data-hover": "Secure Your Base!", className: "formSubmit", type: "submit" },
            React.createElement(
                "div",
                null,
                "Change Password"
            )
        )
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
                "No Characters Yet"
            )
        );
    }

    console.log(props.csrf);
    var characterNodes = props.characters.map(function (character) {
        console.log(props.csrf);
        character._csrf = props.csrf;
        return React.createElement(
            "div",
            { key: character._id, className: "character" },
            React.createElement("img", { src: "/assets/img/character.png", alt: "character face", id: "characterFace" }),
            React.createElement(
                "ul",
                { id: "row1" },
                React.createElement(
                    "li",
                    { className: "charName row1" },
                    React.createElement("img", { id: "icon", src: "/assets/img/nameIcon.png" }),
                    "Name: ",
                    character.name,
                    " "
                ),
                React.createElement(
                    "li",
                    { className: "charAge row1" },
                    React.createElement("img", { id: "icon", src: "https://png.pngtree.com/svg/20170425/age_486205.png" }),
                    "Age: ",
                    character.age,
                    " "
                ),
                React.createElement(
                    "li",
                    { className: "charLevel row1" },
                    React.createElement("img", { id: "icon", src: "https://image.flaticon.com/icons/svg/66/66027.svg" }),
                    "Level: ",
                    character.level
                ),
                React.createElement(
                    "li",
                    { className: "charRace row1" },
                    React.createElement("img", { id: "icon", src: "http://chittagongit.com/download/327283" }),
                    "Race: ",
                    character.race
                ),
                React.createElement(
                    "li",
                    { className: "charHealth row1" },
                    React.createElement("img", { id: "icon", src: "https://freeiconshop.com/wp-content/uploads/edd/heart-outline.png" }),
                    "Health: ",
                    character.health
                ),
                React.createElement(
                    "li",
                    { className: "charArmor row1" },
                    React.createElement("img", { id: "icon", src: "https://cdn4.iconfinder.com/data/icons/video-game-items-concepts/128/armor-helmet-spartan-512.png" }),
                    "Armor: ",
                    character.armor
                )
            ),
            React.createElement(
                "ul",
                { id: "row2" },
                React.createElement(
                    "li",
                    { className: "charGold" },
                    React.createElement("img", { id: "icon", src: "https://png.pngtree.com/svg/20160706/278dec859e.png" }),
                    "Gold: ",
                    character.gold
                ),
                React.createElement(
                    "li",
                    { className: "charStrength" },
                    React.createElement("img", { id: "icon", src: "https://png.pngtree.com/svg/20160921/ad9324c99d.svg" }),
                    "Strength: ",
                    character.strength
                ),
                React.createElement(
                    "li",
                    { className: "charAgility" },
                    React.createElement("img", { id: "icon", src: "http://freeflaticons.com/wp-content/uploads/2014/09/runner-copy-1411788899k84gn.png" }),
                    "Agility: ",
                    character.agility
                ),
                React.createElement(
                    "li",
                    { className: "charWisdom " },
                    React.createElement("img", { id: "icon", src: "https://image.flaticon.com/icons/svg/1092/1092305.svg" }),
                    "Wisdom: ",
                    character.wisdom
                ),
                React.createElement(
                    "li",
                    { className: "charEndurance " },
                    React.createElement("img", { id: "icon", src: "https://www.shareicon.net/download/2016/09/27/836561_heart_512x512.png" }),
                    "Endurance: ",
                    character.endurance
                ),
                React.createElement(
                    "li",
                    { className: "charDefense " },
                    React.createElement("img", { id: "icon", src: "http://icons.iconarchive.com/icons/icons8/ios7/256/Network-Shield-icon.png" }),
                    "Defense: ",
                    character.defense
                )
            ),
            React.createElement(
                "ul",
                null,
                React.createElement(
                    "button",
                    { id: "deleteButton", onClick: function onClick(e) {
                            return handleDelete(e, character);
                        } },
                    React.createElement("img", { src: "/assets/img/trash.png", height: "50", width: "50" })
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "characterList" },
        characterNodes
    );
};

// Dice Window

var DiceWindow = function DiceWindow(props) {

    var rollDice = function rollDice() {
        var die = document.getElementById("result");
        die.innerHTML = Math.floor(Math.random() * 20) + 1;
    };
    return React.createElement(
        "div",
        { id: "diceContainer", key: props.roll },
        React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Roll the Dice!"
            ),
            React.createElement(
                "p",
                null,
                "This is a 20 sided dice. Click it for a random roll!"
            )
        ),
        React.createElement(
            "button",
            null,
            React.createElement("img", { id: "dice", src: "/assets/img/dice.png", alt: "die", onClick: function onClick() {
                    return props.roll = rollDice();
                } })
        ),
        React.createElement(
            "h1",
            { id: "result" },
            "0"
        )
    );
};

// Create Characters
var loadCharactersFromServer = function loadCharactersFromServer(csrf) {
    console.log("yeet");
    sendAjax('GET', '/getCharacters', null, function (data) {
        ReactDOM.render(React.createElement(CharacterList, { characters: data.characters, csrf: csrf }), document.querySelector("#characters"));
    });
};

// Create Windows for Render

var createPasswordWindow = function createPasswordWindow(csrf) {
    ReactDOM.render(React.createElement(PassWordWindow, { csrf: csrf }), document.querySelector("#characterWrapper"));
};

var createUpgradeWindow = function createUpgradeWindow() {
    ReactDOM.render(React.createElement(UpgradeWindow, null), document.querySelector("#characterWrapper"));
};

var createDiceWindow = function createDiceWindow() {
    ReactDOM.render(React.createElement(DiceWindow, { roll: 0 }), document.querySelector("#characterWrapper"));
};

var setup = function setup(csrf) {
    var passwordButton = document.querySelector("#passwordButton");
    var upgradeButton = document.querySelector("#upgradeButton");
    var diceButton = document.querySelector("#diceButton");

    passwordButton.addEventListener("click", function (e) {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });

    upgradeButton.addEventListener("click", function (e) {
        e.preventDefault();
        createUpgradeWindow();
        return false;
    });

    diceButton.addEventListener("click", function (e) {
        e.preventDefault();
        createDiceWindow();
        return false;
    });

    ReactDOM.render(React.createElement(CharacterForm, { csrf: csrf }), document.querySelector("#makeCharacter"));

    ReactDOM.render(React.createElement(CharacterList, { characters: [], csrf: csrf }), document.querySelector("#characters"));

    loadCharactersFromServer(csrf);
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
