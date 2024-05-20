import React, { useEffect, useRef, ReactNode } from 'react';
import '../style/home.css';

// import larcinImg from '../asset/larcin.png';


type Props = {
    children: ReactNode;
    img : string
    // add img
};

const DynamicHR = ({children , img}: Props) => {
const boxHrRef = useRef<HTMLDivElement>(null);

const updateParentWidth = () => {
    if (boxHrRef.current) {
    const parentWidth = boxHrRef.current.offsetWidth;
    boxHrRef.current.style.setProperty('--parent-width', `${parentWidth}px`);
    }
};

useEffect(() => {
    updateParentWidth();

    window.addEventListener('resize', updateParentWidth);

    return () => {
    window.removeEventListener('resize', updateParentWidth);
    };
}, []);

return (
    <div className="box-hr" ref={boxHrRef}>
    <hr className='custom-hr ' aria-hidden='true'></hr>
    <img className="hr-sprite" src={img} alt='sprite décoratif' aria-hidden='true' ></img>  

    {children}

    </div>
);
};

export default DynamicHR;
