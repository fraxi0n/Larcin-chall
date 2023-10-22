import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../App.css';
import Game from '../Game';


const Play = () => {
  const [mapID, setMapID] = useState("");

  const { id } = useParams();


  return (<>

    <div className='app' >


      <Navbar></Navbar>
      <div style={{ padding: " 1rem 4%" }}>
        <Game type={"rapide"} mapID={id ? id : undefined} ></Game >
      </div>

    </div>
  </>

  );
}

export default Play;
