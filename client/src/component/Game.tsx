import React, { useState, useEffect } from 'react';
import ScreenComp from './Screen';
import { Link } from 'react-router-dom';

let largeurEcran = window.innerWidth;

type Props = {
  type: string
  mapID?: string
};
const Game = ({ type, mapID }: Props) => {

  const [width, setWidth] = useState(largeurEcran * 0.85);

  useEffect(() => {
    const handleResize = () => {
      largeurEcran = window.innerWidth;
      setWidth(largeurEcran * 0.85)
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div>
        {mapID &&
          <div>
            Redifusion d'une ancienne map : votre score ne sera pas enregistré .
            <Link to="/play">
              <button style={{ margin: "0 1rem" }} > Lancer le défi du jour</button>
            </Link>
          </div>
        }
        {width > 500 ? <ScreenComp
          widthScreen={width}
          mapID={mapID ? mapID : undefined}
        ></ScreenComp>
          :
          <div>
            <hr></hr>
            <h3>
              Veuillez laisser votre téléphone en mode paysage pour commencer à jouer.
            </h3>
            <hr></hr>
          </div>
        }
      </div>
      <section aria-label='contrôle et objectif du jeu'></ section>
      <div style={{ display: "flex", justifyContent: 'space-around' }}>
        <div>
          <h3 style={{ textAlign: "center", margin: "0" }} > CONTRÔLE : </h3 >
          <p style={{ textAlign: "center", padding: "0", margin: "0" }}>
            Flèches directionnelles ←↑↓→ pour déplacer Larcin
          </p>
        </div>
        <div>
          <h3 style={{ textAlign: "center", margin: "0" }} > OBJECTIF : </h3 >
          <p style={{ textAlign: "center", padding: "0", margin: "0" }}>
            mémoriser le parcours jusqu'à la sortie sans passer par les lasers
          </p>
        </div>
      </div >
    </>
  );
};

export default Game;
