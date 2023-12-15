import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import Navbar from '../Navbar';

import '../../style/classStyle.css';
import '../../style/balise.css';
import '../../style/game.css';


import Game from '../Game';
import Header from '../Header';


const Play = () => {

  const sampleLocation = useLocation();
  const searchParams = new URLSearchParams(sampleLocation.search);
  const id = searchParams.get("id");


  return (<>
    <div className='app' >
      <Header></Header>
      <div style={{ padding: " 1rem 4%" }}>
        <Game type={"rapide"}
          mapID={id ? id : undefined}
        ></Game >
      </div>
    </div>
  </>

  );
}

export default Play;
