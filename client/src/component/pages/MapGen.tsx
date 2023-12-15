import React from 'react';
import Navbar from '../Navbar';
import '../../style/balise.css';
import '../../style/classStyle.css';

import axios from 'axios';


const urlAPI = 'http://127.0.0.1:8000/api/v0/';
const mapRoute = "maps/"


const MapGen = () => {




    const newGen = () => {


        axios.post(urlAPI + mapRoute + 'daily', {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) { alert("simulation d'avance de 24 h passé avec succès") }
            else { alert("simulation échouée, code erreur :" + response.status) }
        })
            ;
    }


    return (


        <div className='app'>

            <Navbar></Navbar>

            <button
                className='button'
                style={{ alignSelf: "center" }}
                onClick={() => { newGen() }}
            >
                PASSER 24H
            </button>

        </div>

    );
}

export default MapGen;
