import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

import './../style/classStyle.css';
import './../style/balise.css';

import { Link } from 'react-router-dom';


const limitScreen = 780

const NavBar = () => {

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
                  <button className='button nav-element dropdown'> LANCER DEFI </button>
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
