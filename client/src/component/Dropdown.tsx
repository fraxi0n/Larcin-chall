import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

// import './button-icon.scss';

type Props = {
  isDisable: boolean;
  textTitle: string;
  textContents: string[];
  remWidth?: number;
  children?: ReactElement<any, any>
  // children : chil
};
const Dropdown = ({ isDisable, textTitle, textContents, remWidth, children }: Props) => {

  const [isOpen, setIsOpen] = useState(false)

  // const getWidth = () => {

  //   if (!remWidth) {
  //     return "auto"
  //   }
  //   return remWidth + "rem"
  // }

  return (
    <div
      className='dropdown'
      style={{ position: "relative" }}
      onClick={() => { !isDisable && setIsOpen(true) }}
      onMouseLeave={() => { setIsOpen(false) }}
    >

      <button
        className='dropdown'
        disabled={isDisable}
      // style={{ width: getWidth() }}


      >
        {textTitle}

      </button>

      {isOpen && textContents.map((content, i) => {
        return <Link to="/play">
          <button className='dropdown' style={{ position: "absolute", left: "0", top: (i + 1) * 3 + "rem" }}
          > {content} </button>

        </Link>

      })}

    </div>

    // <Link to="/play">
    //   <button > LANCER DEFI </button>
    // </Link>


  );

};

export default Dropdown;
