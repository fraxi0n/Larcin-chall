
import { useEffect, useState } from "react";

const ratio = 16 / 8.5
const gameURL = "http://127.0.0.1:5500/game/index.html#"

type Props = {
    widthScreen: number
    mapID?: string
};
const ScreenComp = ({ widthScreen, mapID }: Props) => {

    const [isWidthChanging, setIsWidthChanging] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);
    const [mapIdStr, setMapIdStr] = useState("");

    useEffect(() => {
        if (mapID) {
            setMapIdStr("&id=" + mapID)
        }
    }, [mapID])
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
                src={gameURL + "?lg=" + Math.floor(widthScreen) * 1 + "&mod=1" + mapIdStr}
                title="larcin précis"
                width={widthScreen}
                height={widthScreen / ratio}
            />
    );
};

export default ScreenComp;