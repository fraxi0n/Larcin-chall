import React, { ReactElement, useState } from 'react';


type Props = {
  isDisable: boolean;
  textTitle: string;
  children: ReactElement<any, any>[]
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



      )}

    </div>


  );

};

export default Dropdown;
