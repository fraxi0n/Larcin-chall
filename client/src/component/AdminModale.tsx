import React, { ReactElement, useState } from 'react';

const urlAPI = 'http://127.0.0.1:8000/api/v0/';

const urlUsers = 'users/'
const urlMaps = 'maps/'


type Props = {
    isActive: boolean;
};
const AdminModale = ({ isActive }: Props) => {

    const [pwValue, setPwValue] = useState("")
    const [emailValue, setEmailValue] = useState("")


    // const adminLogin = async (e) => {
    //     e.preventDefault()

    //     try {
    //         const data = encoder.encode(userPasswordLogin);
    //         const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    //         const hashArray = Array.from(new Uint8Array(hashBuffer));
    //         const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    //         const loginBody = {
    //             email: userEmailLogin,
    //             password: hashedPassword,
    //         };

    //         const response = await axios.post(urlAPI + urlUsers + 'admin_login', loginBody, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         // console.log('Response:', response.data);


    //         if (response.status === 200) {

    //             // delete map

    //         }

    //     }
    //     catch (error) {
    //         console.error('Error:', error);


    //     }
    // }


    return (<div className={` ${isActive ? 'delete-map-modale' : 'hidden'}  `} >
        <div className='login-reg-box'>

            <h3>Entrez votre profil administrateur :</h3>
            <label>Pseudo/Email:</label>
            <input type="text" value={emailValue} onChange={(e) => setEmailValue(e.target.value)}></input>
            <br />
            <label >Mot de passe :</label>
            <input type="password" value={pwValue} onChange={(e) => setPwValue(e.target.value)}></input>
            <br></br>
            <input type="submit" value="OK"  ></input>
            <button style={{ margin: ".5rem" }}> Annuler</button>
        </div>

    </div>
    );
};

export default AdminModale;
