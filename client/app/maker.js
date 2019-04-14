const handleCharacter = (e) => {
    e.preventDefault();

    $("#characterMessage").animate({width:'hide'}, 350);

    if($("#characterName").val() == '' || $("#characterAge").val() == '' || $("#characterLevel").val() == ''){
        handleError("All fields are required!");
        return false;
    }

    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function(){
        loadCharactersFromServer();
    });

    return false;
};

const handlePasswordChange = (e) => {
    e.preventDefault();

    $("#characterMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#oldPassword").val() == '' || $("#newPass1").val() == '' || $("#newPass2").val() == ''){
        handleError("All fields are required!");
        return false;
    }

    if($("#newPass1").val() !== $("#newPass2").val()){
        handleError("Passwords do not match!");
        return false;
    }

    sendAjax('POST', $("#passwordChangeForm").attr("action"), $("#passwordChangeForm").serialize(), redirect);

    return false;
};

const CharacterForm = (props) => {
    return(
        <form id="characterForm"
            onSubmit={handleCharacter}
            name="characterForm"
            action="/maker"
            method="POST"
            className="characterForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="charName" type="text" name="name" placeholder="Character Name"/>
            <label htmlFor="age">Age: </label>
            <input id="charAge" type="number" min="1" name="age" placeholder="Character Age"/>
            <label htmlFor="level">Level: </label>
            <input id="charLevel" type="number" min="1" name="level" placeholder="Character Level"/>
            <label htmlFor="race">Race: </label>
            <input id="charRace" type="text" name="race" placeholder="Character Race"/>
            <label htmlFor="health">Health: </label>
            <input id="charHealth" type="number" min="0" name="health" placeholder="Character Health"/>
            <label htmlFor="armor">Armor: </label>
            <input id="charArmor" type="number" min="0" name="armor" placeholder="Character Armor"/>
            <label htmlFor="gold">Gold: </label>
            <input id="charGold" type="number" min="0" name="gold" placeholder="Character Gold"/>
            <label htmlFor="strength">Strength: </label>
            <input id="charStrength" type="number" min="0" name="strength" placeholder="Character Strength"/>
            <label htmlFor="agility">Agility: </label>
            <input id="charAgility" type="number" min="0" name="agility" placeholder="Character Agility"/>
            <label htmlFor="wisdom">Wisdom: </label>
            <input id="charWisdom" type="number" min="0" name="wisdom" placeholder="Character Wisdom"/>
            <label htmlFor="endurance">Endurance: </label>
            <input id="charEndurance" type="number" min="0" name="endurance" placeholder="Character Endurance"/>
            <label htmlFor="defense">Defense: </label>
            <input id="charDefense" type="number" min="0" name="defense" placeholder="Character Defense"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeCharacterSubmit" type="submit" value="Make Character" />
        </form>
    );
};

const PassWordWindow = (props) => {
    return(
        <form id="passwordChangeForm"
            name="passwordChangeForm"
            onSubmit={handlePasswordChange}
            action="/passwordChange"
            method="POST"
            className="mainForm"
        >
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/>
        <label htmlFor="pass">Old Password: </label>
        <input id="oldPassword" type="password" name="pass" placeholder="old password"/>
        <label htmlFor="pass1">New Password: </label>
        <input id="newPass1" type="password" name="pass1" placeholder="new password"/>
        <label htmlFor="pass2">Retype New Password: </label>
        <input id="newPass2" type="password" name="pass2" placeholder="retype password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign Up"/>
        </form>
    );
};

const CharacterList = function(props){
    if(props.characters.length === 0){
        return(
            <div className="characterList">
                <h3 className="emptyCharacter">No Characters yet</h3>
            </div>
        );
    }

    const characterNodes = props.characters.map(function(character) {
        return(
            <div key={character._id} className="character">
                <img src="/assets/img/domoface.jpeg" alt="character face" className="characterFace"/>
                <h3 className="charName">Name: {character.name} </h3>
                <h3 className="charAge">Age: {character.age} </h3>
                <h3 className="charLevel">Level: {character.level}</h3>
                <h3 className="charRace">Race: {character.race}</h3>
                <h3 className="charHealth">Health: {character.health}</h3>
                <h3 className="charArmor">Armor: {character.armor}</h3>
                <h3 className="charGold">Gold: {character.gold}</h3>
                <h3 className="charStrength">Strength: {character.strength}</h3>
                <h3 className="charAgility">Agility: {character.agility}</h3>
                <h3 className="charWisdom">Wisdom: {character.wisdom}</h3>
                <h3 className="charEndurance">Endurance: {character.endurance}</h3>
                <h3 className="charDefense">Defense: {character.defense}</h3>
            </div>
        );
    });

    return(
        <div className="characterList">
            {characterNodes}
        </div>
    );
};

const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.character} />,
            document.querySelector("#characters")
        );
    });
};

const createPasswordWindow = (csrf) => {
    ReactDOM.render(
        <PassWordWindow csrf={csrf} />,
        document.querySelector("#characters")
    );
};

const setup = function(csrf) {
    const passwordButton = document.querySelector("#passwordButton");

    passwordButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });

    ReactDOM.render(
        <CharacterForm csrf={csrf} />, document.querySelector("#makeCharacter")
    );

    ReactDOM.render(
        <CharacterList characters={[]} />,
        document.querySelector("#characters")
    );

    loadCharactersFromServer();
};

const getToken = () => { 
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() { 
    getToken(); 
});  