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
        <div>
            <h3>Continue Your Adventure!</h3>
            <p>
                Welcome traveler! Create new characters for your tabletop adventures! 
                <br></br>
                This app is still on its own journey, but enjoy what it has to offer so far!
            </p>
        </div>
        <label htmlFor="username"></label>
        <input id="user" type="text" name="username" placeholder="Username"/>
        <label htmlFor="pass"></label>
        <input id="pass" type="password" name="pass" placeholder="Password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button data-hover="Let's Go!" className="formSubmit" type="submit"><div>Login</div></button>
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
        <div>
            <h3>Begin Your Adventure!</h3>
            <p>
                Welcome traveler! Create new characters for your tabletop adventures! 
                <br></br>
                This app is still on its own journey, but enjoy what it has to offer so far!
            </p>
        </div>
        <label htmlFor="username"></label>
        <input id="user" type="text" name="username" placeholder="Username"/>
        <label htmlFor="pass"></label>
        <input id="pass" type="password" name="pass" placeholder="Password"/>
        <label htmlFor="pass2"></label>
        <input id="pass2" type="password" name="pass2" placeholder="Retype password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button data-hover="Let's Go!" className="formSubmit" type="submit"><div>Sign Up</div></button>

        </form>
    );
};

const AboutWindow = () => {
    return(
        <div id = "wrapper">
        <div id="sideContent">
            <h2>About This Project</h2>
            <h4>Character Maker Development</h4>
            <p>I created this project as I have recently gotten into
                playing role-playing games and found the stat management 
                among the most interesting aspects of the genre. <br></br>It has also gotten me interested in tabletop
                games, but I've yet to actually play those.
            </p>
            <p>I decided to break down what I believed were common factors or attributes
                for a role-playing character.<br></br>I then used MongoDB to store these values,
                allowing users to build up a list of their customized characters.<br></br>
                The project is built with React and Handlebars to handle updates of dynamic content.
            </p>
            <ul>
                <h4>Shortcomings</h4>
                <p>The final project still has some shortcomings. All of the basic functionality is present, but I missed out on the stretch goals of<br></br>
                    implenting custom templates. I also used pure CSS for styling and not a framework, which while it was fun to explore different tutorials, <br></br>
                    the site itself is not responsive.
                </p>
                <h4>What I'd do with more time</h4>
                <li>- Restyle the project further with a framework for responsve design.</li>
                <li>- Implement custom template themes.</li>
                <li>- Hook up an email subscription list</li>
                
            </ul>
            
        </div>
        </div>
    );
};

const ResourcesWindow = () => {
    return(
        <div id = "wrapper">
        <div id="sideContent">
            <h2>Resources Used</h2>
            <a href="https://codepen.io/madshaakansson/pen/iqDsG?editors=1100">Text Submission Movement - CSS</a>
            <br></br>
            <a href="https://freefrontend.com/css-button-hover-effects/">Form Button Border Animations - CSS</a>
            <br></br>
            <a href="https://codepen.io/Emanuel_G/pen/YVJOZo">Navbar Button Animations - CSS</a>
            <br></br>
            <a href="https://fonts.googleapis.com/css?family=Lato">Font Family Used: Lato</a>
            <br></br>
            <a href="https://www.deviantart.com/turtlegirlman/art/d20-icon-de-la-Gartoon-60651092">Main Dice Picture</a>
            <br></br>
            <a href="https://www.imagenesmy.com/imagenes/dungeon-icon-3e.html">Favicon Image</a>
            <br></br>
            <a href="https://webiconspng.com/wp-content/uploads/2017/01/Red-Trash-Simple-Icon.png">Red Trash Symbol</a>
            <p>The other icons were derived from a variety of free use icon sites or icon archives. Explicit credit can be provided if requested.</p>
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

const createResourceWindow = () => {
    ReactDOM.render(
        <ResourcesWindow />,
        document.querySelector("#content")
    );
};


const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const aboutButton = document.querySelector("#aboutButton");
    const resourceButton = document.querySelector("#resourceButton");

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

    resourceButton.addEventListener("click", (e) => {
        e.preventDefault();
        createResourceWindow();
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

