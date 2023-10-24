// import { response } from "express";

const urlAPI = 'http://127.0.0.1:8000/api/v0/';

const urlUsers = 'users/'
const urlMaps = 'maps/'
const urlScores = 'scores/'

// let MapID

const encoder = new TextEncoder();

const login = async (e) => {
    e.preventDefault()


    try {
        const userEmailLogin = emailInputLogin.value;
        const userPasswordLogin = passwordInputLogin.value;

        const data = encoder.encode(userPasswordLogin);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

        const loginBody = {
            email: userEmailLogin,
            password: hashedPassword,
        };

        const response = await axios.post(urlAPI + urlUsers + 'login', loginBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // console.log('Response:', response.data);


        if (response.status === 200) {
            PlayerID = response.data.userId

            hasPlayerPlayed(PlayerID)
        }

    }
    catch (error) {
        console.error('Error:', error);

        if (error.response.status === 404) {

            errorLogin.innerHTML = "Utilisateur ou mot de passe incorrect"
        }


    }
}


const register = async (e) => {
    e.preventDefault()

    const userEmailRegister = emailInputRegister.value;
    const userNameRegister = nameInputRegister.value;
    const userPasswordRegister = passwordInputRegister.value;

    if (userPasswordRegister !== "" && userNameRegister !== "" && userEmailRegister !== "") {

        try {


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

            const response = await axios.post(urlAPI + urlUsers + 'register', registerBody, {
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
            if (error.response.status === 400) {
                errorRegister.innerHTML = "Nom d'utilisateur / email déjà pris";


            }
        }
    }
    else {
        errorRegister.innerHTML = "Tout les champs ne sont pas remplis";
    }

}

submitRegister.addEventListener("click", register)
submitLogin.addEventListener("click", login)







const hasPlayerPlayed = () => {

    fetch(urlAPI + urlMaps + 'daily')
        .then(response => response.json()) // Convert response to JSON
        .then(data => {

            // const jsonString = JSON.stringify(data);
            fetchedMap = JSON.parse(data.map)
            MapID = data.id
        }).then(() =>



            fetch(`${urlAPI + urlScores}has_score?MapID=${MapID}&PlayerID=${PlayerID}`)
                .then(
                    response => {

                        if (response.status == 422) {
                            console.log(response)
                            alert("Vous avez déjà réalisé le défi d'aujourdhui, revenez demain !")
                        }

                        if (response.status == 200) {

                            axios.post(urlAPI + urlScores + 'score', { PlayerID, MapID }, {
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


const updateScore = async (pScore) => {

    if (!godMODE) {


        try {
            const response = await axios.patch(urlAPI + urlScores + 'score', { MapID, PlayerID, pScore }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error updating score:', error);
        }
    }

};

