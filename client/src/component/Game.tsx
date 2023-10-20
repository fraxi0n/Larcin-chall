import React, { useState, useRef, useEffect } from 'react';
import ScreenComp from './Screen';
// import './button-icon.scss';

let largeurEcran = window.innerWidth;
// let hauteurEcran = window.innerHeight;


type Props = {
  type: string
};
const Game = ({ type }: Props) => {

  //   const [isOpen , setIsOpen] = useState(false)

  // const canvasRef = useRef(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current ù
  //   if (canvas  instanceof HTMLCanvasElement ) {
  //     const ctx = canvas.getContext('2d');
  //     // Perform any additional operations on the 2D rendering context
  //   }
  // }, []);




  const [height, setHeight] = useState(10)
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


  useEffect(() => {

    setHeight(8.5 / 16 * width)


  }, [width])


  return (
    <>

      <div ref={screenRef} >

        {width > 500 ? <ScreenComp widthScreen={width}       ></ScreenComp>

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
