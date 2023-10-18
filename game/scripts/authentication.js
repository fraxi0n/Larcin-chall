
// const axios = require('axios'); // If you are using Node.js
// If you are in a browser environment, you don't need the 'require' statement
// If using ES6 modules
// import axios from 'axios';

// If not using modules and including Axios via CDN, no import is needed.


var hash = window.location.hash;

hash = hash.slice(1);

var hashParams = new URLSearchParams(hash);

var largeurEcran = hashParams.get("lg");

if (!largeurEcran) {
    largeurEcran = window.innerWidth;
}

const hauteurEcran = largeurEcran * 8.5 / 16


const urlAPI = 'http://127.0.0.1:8000/';

// 

// const hauteurEcran = window.innerHeight;

let PlayerID
let MapID




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
const body = document.getElementById("body");





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
            PlayerID = response.data.userId

            hasPlayerPlayed(PlayerID)
        }

    }
    catch (error) {
        console.error('Error:', error);
    }
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

            hasPlayerPlayed()
        }

    } catch (error) {
        console.error('Error:', error);
    }

}

submitRegister.addEventListener("click", register)
submitLogin.addEventListener("click", login)


const hasPlayerPlayed = () => {

    fetch('http://127.0.0.1:8000/daily')
        .then(response => response.json()) // Convert response to JSON
        .then(data => {

            // const jsonString = JSON.stringify(data);
            fetchedMap = JSON.parse(data.map)
            MapID = data.id
        }).then(() =>



            fetch(`http://127.0.0.1:8000/has_score?MapID=${MapID}&PlayerID=${PlayerID}`)
                .then(
                    response => {

                        if (response.status == 422) {
                            console.log(response)
                            alert("Vous avez déjà réalisé le défi d'aujourdhui, revenez demain !")
                        }

                        if (response.status == 200) {

                            axios.post(urlAPI + 'score', { PlayerID, MapID }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }).then(response => { console.log("ok pour jouer", response) })
                            runGame()
                        }
                    })
                .catch(error => {
                    console.log(error)

                })
        )

}

let canvas
const runGame = () => {

    loginForm.classList.add("hidden")
    registrationForm.classList.add("hidden")

    canvas = document.createElement("canvas");
    canvas.id = "canvas";

    // console.log(largeurEcran)

    canvas.width = largeurEcran;
    canvas.height = hauteurEcran
    canvas.style.backgroundColor = "black";
    canvas.style.margin = "auto";


    canvasContainer = document.createElement("div");
    canvasContainer.width = largeurEcran;
    canvasContainer.id = "canvas-container";
    canvasContainer.style.display = "flex";
    canvasContainer.style.justifyContent = "center";



    root.appendChild(canvasContainer);
    canvasContainer.appendChild(canvas);


    initGame()

}

const updateScore = async (pScore) => {
    try {
        const response = await axios.patch(urlAPI + 'score', { MapID, PlayerID, pScore }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error updating score:', error);
    }
};

