import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

import './../App.css';
import { Link } from 'react-router-dom';

import welcomeImg from '../asset/Sporte.png';

const limitScreen = 780
let largeurEcran: number

type Props = { isConnected?: boolean };
const NavBar = ({ isConnected = false }: Props) => {

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    largeurEcran = window.innerWidth;
    setWidth(window.innerWidth)

  };


  useEffect(() => {

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //   handleResize()
  // }, []);





  return (
    <nav className='nav'>

      <Link to="/">
        <img src={welcomeImg} alt='Go to welcome page'></img>
      </Link>

      {width > limitScreen ?
        <>


          <Link to="/play#">
            <button className='button nav-element nav-button' > LANCER DEFI </button>
          </Link>

          <Link to="/leaderboard"><button className='button nav-element nav-button'>
            LEADERBOARD
          </button></Link>
          <Link to="/mapgen"><button className='button nav-element nav-button'>
            NOUVELLE GENERATION
          </button></Link>
        </>
        :
        <>
          <Dropdown
            isDisable={false}
            textTitle={'MENU'}

          >{
              [
                <Link to="/play">
                  <button className='nav-element dropdown'> LANCER DEFI </button>
                </Link>,
                <Link to="/leaderboard"><button className='button nav-element dropdown' >
                  LEADERBOARD
                </button></Link>,
                <Link to="/mapgen"><button className='button nav-element dropdown'>
                  NOUVELLE GENERATION
                </button></Link>
              ]
            }
          </Dropdown>

        </>

      }

    </nav >
  );
};

export default NavBar;
