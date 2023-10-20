import React from 'react';
import Navbar from '../Navbar';
import '../../App.css';
import Game from '../Game';
import axios from 'axios';


const MapGen = () => {



    const urlAPI = 'http://127.0.0.1:8000/';

    const newGen = () => {


        axios.post(urlAPI + 'daily', {
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

            <header className="App-header">

                <Navbar></Navbar>


                <button
                    style={{ margin: "auto" }}
                    onClick={() => { newGen() }}
                >

                    PASSER 24H

                </button>

            </header>

        </div>

    );
}

export default MapGen;
