import React from 'react';
import Navbar from '../Navbar';
import '../../App.css';
import Game from '../Game';

const Play = () => {
  return (<>

    <header className="App-header">

      <Navbar></Navbar>

      {/* <Game></Game> */}






    </header>
    <body style={{ height: "90%", width: "100%" }}>
      <Game type={"rapide"} ></Game >
    </body>
  </>

  );
}

export default Play;
