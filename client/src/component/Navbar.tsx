import React from 'react';
import Dropdown from './Dropdown';

import './../App.css';
import { Link } from 'react-router-dom';

import welcomeImg from '../asset/Sporte.png';
import playImg from '../asset/larcin.png'


type Props = { isConnected? : boolean };
const NavBar = ({ isConnected = false}: Props) => {
  
  
  return (
    <nav className='nav'>
    
    
    <Link to="/"> 
    <img src={welcomeImg} alt='Go to welcome page'></img>
    </Link>

  
  <Dropdown
  isDisable={ isConnected}
  textTitle={'JOUER' }
  textContents={['LARCIN PRECIS','LARCIN MORTEL','LARCIN ECLAIR']}
  remWidth={10}
  >
  
  <img src={playImg} alt='Go to welcome page'></img>
  
  </Dropdown>
  
  
  
  
  <Link to="/leaderboard"><button>
  LEADERBOARD
  </button></Link>
  
  
  <button>
  { isConnected? <>log out</> : <>log in</>}
  </button>
  
  
  
  </nav>
  );
};

export default NavBar;
