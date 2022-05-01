import React from 'react';

export default function FunctionCall({row, clickFunction, clickParameterSet, children}) {

  function handleClick(e) {
    e.preventDefault();  
    e.row = row
    clickFunction(e,clickParameterSet) 
  }

  return (
    <a onClick={handleClick}>
      {children}
    </a>
  )
}