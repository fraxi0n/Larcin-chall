let isLoginDisplayed = true
const toggleFormsLinks = document.getElementsByClassName("toggleForms");
const loginForm = document.getElementById("login");
const registrationForm = document.getElementById("register");


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
