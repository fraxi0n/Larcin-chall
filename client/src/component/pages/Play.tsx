import React from 'react';
import Navbar from '../Navbar';
import '../../App.css';
import Game from '../Game';

const Play = () => {
  return (<>

    <div className='app' >


      <Navbar></Navbar>
      <div style={{ padding: " 1rem 4%" }}>
        <Game type={"rapide"} ></Game >
      </div>

    </div>
  </>

  );
}

export default Play;
