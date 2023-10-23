// import React from 'react';

import { useEffect, useState } from "react";

const ratio = 16 / 8.5

type Props = {
    widthScreen: number
    mapID?: string
};
const ScreenComp = ({ widthScreen, mapID }: Props) => {

    console.log("screen", mapID)




    const [isWidthChanging, setIsWidthChanging] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);
    const [mapIdStr, setMapIdStr] = useState("");


    useEffect(() => {

        if (mapID) {
            setMapIdStr("&id=" + mapID)
        }


    }, [mapID])

    // if (mapID) {
    //     setMapIdStr("&id=" + mapID)
    // }


    useEffect(() => {
        setIsWidthChanging(true);
        const timeoutId = setTimeout(() => {
            setIsWidthChanging(false);
            setIframeKey((prevKey) => prevKey + 1);
        }, 500);
        return () => {
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
                src={"http://127.0.0.1:5500/game/index.html#?lg=" + Math.floor(widthScreen) * 1 + "&mod=1" + mapIdStr}  // Replace with your desired URL
                title="larcin précis"
                width={widthScreen}                   // Set the width as per your requirement
                height={widthScreen / ratio}               // Set the height as per your requirement
                // frameBorder="0"               // Optionally, you can set frameBorder to 0 for no border
                allowFullScreen={true}             // Enable fullscreen mode if needed
            ></iframe>


    );
};

export default ScreenComp;
