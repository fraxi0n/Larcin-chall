// import React from 'react';

import { useEffect, useState } from "react";

const ratio = 16 / 8.5

type Props = {
    widthScreen: number
};
const ScreenComp = ({ widthScreen }: Props) => {


    const [iframeKey, setIframeKey] = useState(0);
    const [isWidthChanging, setIsWidthChanging] = useState(false);

    useEffect(() => {
        // Set a flag to indicate that the width is changing
        setIsWidthChanging(true);

        // Wait for 1 second before changing the key and triggering a reload
        const timeoutId = setTimeout(() => {
            setIsWidthChanging(false);
            // Increment the key to force a re-render of the iframe
            setIframeKey((prevKey) => prevKey + 1);
        }, 500);

        return () => {
            // Cleanup the timeout in case the width changes again before the 1-second delay
            clearTimeout(timeoutId);
        };
    }, [widthScreen]);



    return (
        isWidthChanging ?
            <div className="loading-screen"> loading... windows is changing</div>
            :
            <iframe
                key={iframeKey}
                className='canvas'
                src={"http://127.0.0.1:5500/game/index.html#?lg=" + widthScreen * 1 + "&mod=1"}  // Replace with your desired URL
                title="larcin précis"
                width={widthScreen}                   // Set the width as per your requirement
                height={widthScreen / ratio}               // Set the height as per your requirement
                // frameBorder="0"               // Optionally, you can set frameBorder to 0 for no border
                allowFullScreen={true}             // Enable fullscreen mode if needed
            ></iframe>


    );
};

export default ScreenComp;
