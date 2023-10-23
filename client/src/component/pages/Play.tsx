import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../App.css';
import Game from '../Game';


const Play = () => {

  // const id = useParams();

  const sampleLocation = useLocation();
  const searchParams = new URLSearchParams(sampleLocation.search);
  const id = searchParams.get("id");


  return (<>
    <div className='app' >
      <Navbar></Navbar>
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
