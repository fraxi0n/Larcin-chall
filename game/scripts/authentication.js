
// const axios = require('axios'); // If you are using Node.js
// If you are in a browser environment, you don't need the 'require' statement
// If using ES6 modules
// import axios from 'axios';

// If not using modules and including Axios via CDN, no import is needed.

const urlAPI = 'http://127.0.0.1:8000/';






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

const userEmailLogin = emailInputLogin.value;
const userPasswordLogin = passwordInputLogin.value;




// const userEmailLogin = emailInput.value;
// const userPasswordLogin = passwordInput.value;
// const userEmailRegister = emailInputRegister.value;
// const userPasswordRegister = passwordInputRegister.value;
// const userNameRegister = nameInputRegister.value;


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








const register = () => {

    const userEmailRegister = emailInputRegister.value;
    const userPasswordRegister = passwordInputRegister.value;
    const userNameRegister = nameInputRegister.value;

    registerBody = {
        name: userNameRegister,
        email: userEmailRegister,
        password: userPasswordRegister
    }

    console.log('envoi', registerBody)

    console.log("lezgong")
    axios.post(urlAPI + 'register', registerBody, {
        headers: {
            'Content-Type': 'application/json', // Set the appropriate content type for your API
        }

    })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

submitRegister.addEventListener("click", register)
