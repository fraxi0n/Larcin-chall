import React, {  useState , useRef, useEffect  } from 'react';
// import './button-icon.scss';

type Props = { 
    type : string
};
const Game = ({type}: Props) => {
//   const [isOpen , setIsOpen] = useState(false)

// const canvasRef = useRef(null);

// useEffect(() => {
  //   const canvas = canvasRef.current ù
  //   if (canvas  instanceof HTMLCanvasElement ) {
  //     const ctx = canvas.getContext('2d');
  //     // Perform any additional operations on the 2D rendering context
  //   }
  // }, []);

  
  
 

  
  return (
    <>

<iframe
        src="http://127.0.0.1:5500/index.html?mod=1&id=1"  // Replace with your desired URL
        title="Embedded Content"
        width="95%"                   // Set the width as per your requirement
        height="1000px"                  // Set the height as per your requirement
        frameBorder="0"               // Optionally, you can set frameBorder to 0 for no border
        allowFullScreen              // Enable fullscreen mode if needed
      ></iframe>

    



    {/* <canvas //ref={canvasRef}
     id="canvas" width="1200" height= "675" style={{backgroundColor: "black"}} ></canvas> */}
    
    </>
    );
  };
  
  export default Game;
  