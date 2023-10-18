import React, { useState, useRef, useEffect } from 'react';
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

    setHeight(7 / 16 * width)


  }, [width])


  return (
    <>
      <div ref={screenRef} >



        {
          width > 500 ?
            <iframe
              className='canvas'
              src={"http://127.0.0.1:5500/game/index.html#?lg=" + width + "&mod=1"}  // Replace with your desired URL
              title="larcin précis"
              width={width}                   // Set the width as per your requirement
              height={height}               // Set the height as per your requirement
              // frameBorder="0"               // Optionally, you can set frameBorder to 0 for no border
              allowFullScreen={true}             // Enable fullscreen mode if needed
            ></iframe>
            :
            <div>
              passer  en mode paysage pour commencer a jouer
            </div>


        }

      </div>

      <p>


        {/* 
        CONTRÔLE :

        Flèches directionnelles : déplacer Larcin, naviguer dans les menus

        Entrée : valider

        Echap : retourner au menu

        RÈGLES :

        " Larcin Lazer est un puzzle game dans lequel votre mémoire est mise à l’épreuve. Chaque niveau est rempli de lasers qui disparaissent aussitôt que vous commencez à bouger. Déplacez-vous discrètement en vous fiant à votre mémoire pour arriver jusqu’à la fin du parcours "  - page steam de Larcin Lazer

        Il est conseillé de jouer à la démo de Larcin Lazer avant d’essayer Larcin Lazer Challenge.
 */}


      </p>




      {/* <canvas //ref={canvasRef}
     id="canvas" width="1200" height= "675" style={{backgroundColor: "black"}} ></canvas> */}

    </>
  );
};

export default Game;
