
// const axios = require('axios'); // If you are using Node.js
// If you are in a browser environment, you don't need the 'require' statement
// If using ES6 modules
// import axios from 'axios';

// If not using modules and including Axios via CDN, no import is needed.

const urlAPI = 'http://127.0.0.1:8000/';

let PlayerID




let isLoginDisplayed = true
const toggleFormsLinks = document.getElementsByClassName("toggleForms");
const loginForm = document.getElementById("login");
const registrationForm = document.getElementById("register");

const submitRegister = document.getElementById("submitRegister");
const submitLogin = document.getElementById("submitLogin");



const emailInputLogin = document.getElementById("loginEmail");
const passwordInputLogin = document.getElementById("loginPassword");
const emailInputRegister = document.getElementById("regEmail");
const passwordInputRegister = document.getElementById("regPassword");
const nameInputRegister = document.getElementById("regName");
const root = document.getElementById("root");




const toggleForms = () => {
    if (isLoginDisplayed) {
        loginForm.classList.add("hidden")
        registrationForm.classList.remove("hidden")
        isLoginDisplayed = !isLoginDisplayed
    } else {
        loginForm.classList.remove("hidden")
        registrationForm.classList.add("hidden")
        isLoginDisplayed = !isLoginDisplayed
    }
};


toggleFormsLinks[0].addEventListener("click", toggleForms)
toggleFormsLinks[1].addEventListener("click", toggleForms)

const encoder = new TextEncoder();

const login = async (e) => {
    e.preventDefault()
    // todo login


    try {
        const userEmailLogin = emailInputLogin.value;
        const userPasswordLogin = passwordInputLogin.value;



        const data = encoder.encode(userPasswordLogin);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        // Create the registration request body
        const loginBody = {
            email: userEmailLogin,
            password: hashedPassword,
        };

        const response = await axios.post(urlAPI + 'login', loginBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data);


        if (response.status === 200) {
            PlayerID = response.data.ID
            console.log(PlayerID)

            hasPlayerPlayed(PlayerID)

            runGame()

        }



    }
    catch (error) {
        console.error('Error:', error);
    }







    // runGame()




}


const register = async (e) => {
    e.preventDefault()
    try {
        const userEmailRegister = emailInputRegister.value;
        const userNameRegister = nameInputRegister.value;
        const userPasswordRegister = passwordInputRegister.value;

        const data = encoder.encode(userPasswordRegister);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        // Create the registration request body
        const registerBody = {
            name: userNameRegister,
            email: userEmailRegister,
            password: hashedPassword,
        };

        const response = await axios.post(urlAPI + 'register', registerBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data);

        if (response.status === 200) {
            PlayerID = response.data.ID
            console.log(PlayerID)

            hasPlayerPlayed(PlayerID)



        }

    } catch (error) {
        console.error('Error:', error);
    }

}

submitRegister.addEventListener("click", register)
submitLogin.addEventListener("click", login)


const hasPlayerPlayed = (pID) => {

    // requete pour voir si ya un score présent pour l'id du joueur + la map 
    if (pID) {
        runGame()
    }
}

let canvas
const runGame = () => {

    loginForm.classList.add("hidden")
    registrationForm.classList.add("hidden")

    canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = "1200";
    canvas.height = "675";
    canvas.style.backgroundColor = "black";
    root.appendChild(canvas);

    initGame()

}