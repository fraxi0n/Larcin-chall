import axios from 'axios';
import React, { useState } from 'react';

const urlAPI = 'http://127.0.0.1:8000/api/v0/';

const urlUsers = 'users/'
const urlMaps = 'maps/'

const encoder = new TextEncoder();


type Props = {
    isActive: boolean;
    mapID: number;
    desactivation: () => void
};
const AdminModale = ({ isActive, mapID, desactivation }: Props) => {

    const [pwValue, setPwValue] = useState("")
    const [emailValue, setEmailValue] = useState("")


    const adminLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        try {
            const data = encoder.encode(pwValue);
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

            const loginBody = {
                email: emailValue,
                password: hashedPassword,
            };

            const response = await axios.post(urlAPI + urlUsers + 'admin_login', loginBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });



            if (response.status === 200) {

                console.log("je passe ")

                fetch(urlAPI + urlMaps + 'map/' + mapID, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {

                        desactivation()

                        if (!response.ok) {
                            alert("'La requête DELETE a échoué'")

                            throw new Error('La requête DELETE a échoué');

                        }
                        else { alert("la map à été supprimé avec succes !") }
                    })
                    .catch(error => {
                        console.error('Une erreur s\'est produite :', error);
                        desactivation()

                    });



            }



        }
        catch (error: any) {
            desactivation()

            alert(error.response.data)
        }
    }


    return (<div className={` ${isActive ? 'delete-map-modale' : 'hidden'}  `} >
        <div className='login-reg-box'>

            <h3>Entrez votre profil administrateur :</h3>
            <label>Pseudo/Email:</label>
            <input type="text" value={emailValue} onChange={(e) => setEmailValue(e.target.value)}></input>
            <br />
            <label >Mot de passe :</label>
            <input type="password" value={pwValue} onChange={(e) => setPwValue(e.target.value)}></input>
            <br></br>
            <input type="submit" value="OK" onClick={adminLogin} className='button' ></input>
            <button className='button' style={{ margin: ".5rem" }} onClick={desactivation} > Annuler</button>
        </div>

    </div>
    );
};

export default AdminModale;
