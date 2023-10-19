import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

import './../App.css';
import { Link } from 'react-router-dom';

import welcomeImg from '../asset/Sporte.png';
import playImg from '../asset/larcin.png'

const limitScreen = 780
let largeurEcran = window.innerWidth;
// let hauteurEcran = window.innerHeight;

type Props = { isConnected?: boolean };
const NavBar = ({ isConnected = false }: Props) => {

  // const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      console.log('Screen size changed');
      // You can also access the updated screen dimensions using window.innerWidth and window.innerHeight.
      largeurEcran = window.innerWidth;
      // hauteurEcran = window.innerHeight;
      setWidth(window.innerWidth)

    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  return (
    <nav className='nav'>

      <Link to="/">
        <img src={welcomeImg} alt='Go to welcome page'></img>
      </Link>

      {width > limitScreen ?
        <>


          <Link to="/play">
            <button className='nav-element nav-button' > LANCER DEFI </button>
          </Link>

          <Link to="/leaderboard"><button className='nav-element nav-button'>
            LEADERBOARD
          </button></Link>
          <Link to="/mapgen"><button className='nav-element nav-button'>
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
                <Link to="/leaderboard"><button className='nav-element dropdown' >
                  LEADERBOARD
                </button></Link>,
                <Link to="/mapgen"><button className='nav-element dropdown'>
                  NOUVELLE GENERATION
                </button></Link>
              ]
            }


            {/* <Link to="/mapgen"><button className='nav-button'>
                NOUVELLE GENERATION
              </button></Link>

            </> */}



          </Dropdown>

        </>


      }



    </nav >
  );
};

export default NavBar;
