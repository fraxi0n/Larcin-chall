import React, { ReactElement, useState } from 'react';

// import './button-icon.scss';

type Props = {
  isDisable: boolean;
  textTitle: string;
  // textContents: string[];
  children: ReactElement<any, any>[]
  // children : chil
};
const Dropdown = ({ isDisable, textTitle, children }: Props) => {

  const [isOpen, setIsOpen] = useState(false)



  return (
    <div
      className=' nav-element dropdown'
      onClick={() => { !isDisable && setIsOpen(true) }}
      onMouseLeave={() => { setIsOpen(false) }}

    >

      <button
        className='button button-lazer nav-element dropdown'
        // style={{ marginTop: ".5rem"; font-family: "pfont" }}
        disabled={isDisable}
        style={{}}


      >
        {textTitle}

      </button>

      {isOpen && children.map((content) => {

        return <div style={{ position: "relative", left: "0", top: "0", margin: "0", }}>
          {content}
        </div>


      }

        // return <Link to="/play">
        //   <button className='dropdown' style={{ position: "absolute", left: "0", top: (i + 1) * 3 + "rem" }}
        //   > {content} </button>

      )}

    </div>


  );

};

export default Dropdown;
