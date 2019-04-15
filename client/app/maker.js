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

const UpgradeWindow = () =>{
    return(
        <div id="upgradeContainer">
        <div>
            <h3>Unlock New Templates!</h3>
            <p>This app, and this feature are a work in progress!</p>
            <p>In the future, you will be able to buy new themed templates to create
                unique characters from your favorite movies, shows, or games!
            </p>
        </div>
            <ul>
                <div id="row1">
                    <li>
                        <a className="upgradeButton" id="starWars" href="#" onClick={() => alert("You have preordered the Star Wars Sheet")}>Star Wars Upgrade</a>
                    </li>
                    <li>
                        <a className="upgradeButton" id="destiny" href="#" onClick={() => alert("You have preordered the Destiny Sheet")}>Destiny Upgrade</a>
                    </li>
                </div>
                <div id="row2">
                    <li>
                        <a className="upgradeButton" id="starTrek" href="#" onClick={() => alert("You have preordered the Star Trek Sheet")}>Star Trek Upgrade</a>
                    </li>
                    <li>
                        <a className="upgradeButton" id="marvel" href="#" onClick={() => alert("You have preordered the Marvel Sheet")}>Marvel Upgrade</a>
                    </li>
                </div> 
                
            </ul>
        </div>
        
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
        <div>
            <h3>Change Your Password!</h3>
            <p>Feeling unsafe? Got a weird email? Keep your account secure and change your password.</p>
        </div>
        <label htmlFor="username"></label>
        <input id="user" type="text" name="username" placeholder="Username"/>
        <label htmlFor="pass"></label>
        <input id="oldPassword" type="password" name="pass" placeholder="Old Password"/>
        <label htmlFor="pass1"></label>
        <input id="newPass1" type="password" name="pass1" placeholder="New Password"/>
        <label htmlFor="pass2"></label>
        <input id="newPass2" type="password" name="pass2" placeholder="Retype Password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button data-hover="Secure Your Base!" className="formSubmit" type="submit"><div>Change Password</div></button>
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
                <img src="/assets/img/character.png" alt="character face" className="characterFace"/>
                <ul id="row1">
                    <li className="charName row1">Name: {character.name} </li>
                    <li className="charAge row1">Age: {character.age} </li>
                    <li className="charLevel row1">Level: {character.level}</li>
                    <li className="charRace row1">Race: {character.race}</li>
                    <li className="charHealth row1">Health: {character.health}</li>
                    <li className="charArmor row1">Armor: {character.armor}</li>
                </ul>
                <ul id="row2">
                    <li className="charGold">Gold: {character.gold}</li>
                    <li className="charStrength">Strength: {character.strength}</li>
                    <li className="charAgility">Agility: {character.agility}</li>
                    <li className="charWisdom ">Wisdom: {character.wisdom}</li>
                    <li className="charEndurance ">Endurance: {character.endurance}</li>
                    <li className="charDefense ">Defense: {character.defense}</li>
                </ul>
                
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
            <CharacterList characters={data.characters} />,
            document.querySelector("#characters")
        );
    });
};

const createPasswordWindow = (csrf) => {
    ReactDOM.render(
        <PassWordWindow csrf={csrf} />,
        document.querySelector("#characterWrapper")
    );
};

const createUpgradeWindow = () => {
    ReactDOM.render(
        <UpgradeWindow />,
        document.querySelector("#characterWrapper")
    );
};

const setup = function(csrf) {
    const passwordButton = document.querySelector("#passwordButton");
    const upgradeButton = document.querySelector("#upgradeButton");

    passwordButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });

    upgradeButton.addEventListener("click", (e) => {
        e.preventDefault();
        createUpgradeWindow();
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