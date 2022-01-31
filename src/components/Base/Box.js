import React from 'react';


export default function Box(props)  {

  let className = props.className + " card shadow-2xl"

  return (
    <>
      <div id={props.id}  className={className}>
          {props.children}
      </div>
    </>
  )
}



