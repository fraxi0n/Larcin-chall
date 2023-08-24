import React, { ReactElement, useState } from 'react';
// import './button-icon.scss';

type Props = {
  isDisable : boolean;
  textTitle : string;
  textContents : string[] ; 
  remWidth?: number ;
  children?: ReactElement<any,any>
  // children : chil
};
const Dropdown = ({ isDisable, textTitle , textContents , remWidth, children  }: Props) => {
  
  const [isOpen , setIsOpen] = useState(false)
  
  const getWidth = () => {
    
    if (!remWidth) 
    {
      return "auto"
    }
    
    return remWidth+"rem"
    
  }
  
  return (
    <div
    style={{position : "relative"}}
    onMouseEnter={()=>  {  !isDisable&&setIsOpen(true) }}
    onMouseLeave={()=>  { setIsOpen(false) }}
    >
    
    <button 
    disabled={isDisable}
    style={{ width : getWidth()   }}
    
    
    >
    {textTitle}
    
    </button>
    
    {isOpen&& textContents.map( (content, i) => { 
      return  <button style={{ width : getWidth()  , position: "absolute" , left: "0" , top: (i+1)*3.5+"rem"}}> {content} </button> })
      
    }
    
    </div>
    
    
    );
  };
  
  export default Dropdown;
  