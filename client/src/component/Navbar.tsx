import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import axios from 'axios';

import './../style/classStyle.css';
import './../style/balise.css';

import { Link } from 'react-router-dom';

const urlAPI = 'http://127.0.0.1:8000/api/v0/';
const mapRoute = "maps/"
const limitScreen = 780

const NavBar = () => {

  const newGen = () => {
    axios.post(urlAPI + mapRoute + 'daily', {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 200) { alert("simulation d'avance de 24 h passé avec succès") }
      else { alert("simulation échouée, code erreur :" + response.status) }
    });
  }

  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth)
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className='nav'>
      {width > limitScreen ?
        <>
          <Link to="/play#">
            <button className='button button-lazer nav-element nav-button' > LANCER DEFI </button>
          </Link>
          <Link to="/leaderboard"><button className='button button-lazer nav-element nav-button'>
            LEADERBOARD
          </button></Link>
          <button className='button button-lazer nav-element nav-button'
            onClick={() => { newGen() }} >
            NOUVELLE GENERATION
          </button>
        </>
        :
        <>
          <Dropdown
            isDisable={false}
            textTitle={'MENU'} 
            >{
              [
                <Link to="/play">
                  <button className='button button-lazer nav-element dropdown'> LANCER DEFI </button>
                </Link>,
                <Link to="/leaderboard"><button className='button button-lazer nav-element dropdown' >
                  LEADERBOARD
                </button></Link>,
                <button
                  className='button button-lazer'
                  style={{ alignSelf: "center" }}
                  onClick={() => { newGen() }}
                >
                  NOUVELLE GENERATION
                </button>
              ]
            }
          </Dropdown>
        </>
      }
    </nav >
  );
};

export default NavBar;
