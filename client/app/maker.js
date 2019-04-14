const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoLevel").val() == ''){
        handleError("ROAR! All fields are required!");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
        loadDomosFromServer();
    });

    return false;
};

const handlePasswordChange = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

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

const DomoForm = (props) => {
    return(
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="1" name="age" placeholder="Domo Age"/>
            <label htmlFor="level">Level: </label>
            <input id="domoLevel" type="number" min="1" name="level" placeholder="Domo Level"/>
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
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
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

const DomoList = function(props){
    if(props.domos.length === 0){
        return(
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo) {
        return(
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace"/>
                <h3 className="domoName">Name: {domo.name} </h3>
                <h3 className="domoAge">Age: {domo.age} </h3>
                <h3 className="domoLevel">Level: {domo.level}</h3>
                <h3 className="charRace">Race: {domo.race}</h3>
                <h3 className="charHealth">Health: {domo.health}</h3>
                <h3 className="charArmor">Armor: {domo.armor}</h3>
                <h3 className="charGold">Gold: {domo.gold}</h3>
                <h3 className="charStrength">Strength: {domo.strength}</h3>
                <h3 className="charAgility">Agility: {domo.agility}</h3>
                <h3 className="charWisdom">Wisdom: {domo.wisdom}</h3>
                <h3 className="charEndurance">Endurance: {domo.endurance}</h3>
                <h3 className="charDefense">Defense: {domo.defense}</h3>
            </div>
        );
    });

    return(
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />,
            document.querySelector("#domos")
        );
    });
};

const createPasswordWindow = (csrf) => {
    ReactDOM.render(
        <PassWordWindow csrf={csrf} />,
        document.querySelector("#domos")
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
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.querySelector("#domos")
    );

    loadDomosFromServer();
};

const getToken = () => { 
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() { 
    getToken(); 
});  