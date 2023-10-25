import React, { useState, useRef, useEffect } from 'react';
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
      console.log('Screen size changed');
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
            passer  en mode paysage pour commencer a jouer
          </div>


        }

      </div>
      <p style={{ textAlign: "center", padding: "0" }}>
        CONTRÔLE : Flèches directionnelles ←↑↓→ pour déplacer Larcin   //   OBJECTIF: mémoriser le parcours jusqu'à la sortie sans passer par les lasers
      </p>
    </>
  );
};

export default Game;
