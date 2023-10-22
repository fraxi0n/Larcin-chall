import React, { useState, useRef, useEffect } from 'react';
import ScreenComp from './Screen';
// import './button-icon.scss';

let largeurEcran = window.innerWidth;


type Props = {
  type: string
  mapID?: string
};
const Game = ({ type, mapID }: Props) => {

  console.log(mapID)


  // const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(largeurEcran * 0.85);


  useEffect(() => {
    const handleResize = () => {
      console.log('Screen size changed');
      // You can also access the updated screen dimensions using window.innerWidth and window.innerHeight.
      largeurEcran = window.innerWidth;
      // hauteurEcran = window.innerHeight;
      setWidth(largeurEcran * 0.85)

    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);




  const screenRef = useRef(null);


  // useEffect(() => {
  //   setHeight(8.5 / 16 * width)
  // }, [width])


  return (
    <>

      <div ref={screenRef} >

        {width > 500 ? <ScreenComp widthScreen={width} mapID={mapID ? mapID : undefined}   ></ScreenComp>

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
