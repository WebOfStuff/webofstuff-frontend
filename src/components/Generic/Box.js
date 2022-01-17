import React from 'react';


export default function Box(props)  {

  let className = props.className + " card lg:card-side card-bordered card-body"

  return (
    <>
      <div id={props.id}  className={className}>
          {props.children}
      </div>
    </>
  )
}



