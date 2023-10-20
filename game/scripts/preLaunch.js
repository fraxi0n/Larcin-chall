var hash = window.location.hash;

hash = hash.slice(1);

var hashParams = new URLSearchParams(hash);

var largeurEcran = hashParams.get("lg");

if (!largeurEcran) {
    largeurEcran = window.innerWidth;
}

const hauteurEcran = largeurEcran * 8.5 / 16

MapID = hashParams.get("id");

let canvas

let isLoginDisplayed = true

const toggleFormsLinks = document.getElementsByClassName("toggleForms");
const loginForm = document.getElementById("login");
const registrationForm = document.getElementById("register");

const submitRegister = document.getElementById("submitRegister");
const submitLogin = document.getElementById("submitLogin");

const errorRegister = document.getElementById("errorRegister");
const errorLogin = document.getElementById("errorLogin");


const emailInputLogin = document.getElementById("loginEmail");
const passwordInputLogin = document.getElementById("loginPassword");
const emailInputRegister = document.getElementById("regEmail");
const passwordInputRegister = document.getElementById("regPassword");
const nameInputRegister = document.getElementById("regName");
const root = document.getElementById("root");
const body = document.getElementById("body");

const vKeyboard = document.getElementById("virtual-keyboard");
const upArrow = document.querySelector('.arrow.up');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
const downArrow = document.querySelector('.arrow.down');


let isUpRelease = true
let isLeftRelease = true
let isRightRelease = true
let isdownRelease = true


const canMove = () => {
    return (animON == false && score == false)
}

upArrow.addEventListener('mousedown', (e) => {
    e.preventDefault()
    if (isUpRelease && canMove()) {

        LarcinMove(0, -1)
        isUpRelease = false
    }
})


leftArrow.addEventListener('mousedown', (e) => {
    e.preventDefault()

    if (isLeftRelease && canMove()) {
        LarcinMove(-1, 0)
        isLeftRelease = false
    }


});

rightArrow.addEventListener('mousedown', (e) => {
    e.preventDefault()

    if (isRightRelease && canMove()) {
        LarcinMove(+1, 0)
        isRightRelease = false
    }
});

downArrow.addEventListener('mousedown', (e) => {
    e.preventDefault()

    if (isDownRelease && canMove()) {
        LarcinMove(0, +1)
        isDownRelease = false
    }
});


vKeyboard.addEventListener('mouseup', () => {

    isUpRelease = true
    isLeftRelease = true
    isRightRelease = true
    isDownRelease = true
});



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


const runGame = () => {

    if (largeurEcran < 1000) {
        vKeyboard.classList.remove("hidden")
        vKeyboard.classList.add("virtual-keyboard")

    }


    loginForm.classList.add("hidden")
    registrationForm.classList.add("hidden")

    canvas = document.createElement("canvas");
    canvas.id = "canvas";

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
