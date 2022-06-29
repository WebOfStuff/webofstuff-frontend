import React, { createRef, FunctionComponent, MutableRefObject, RefObject, useEffect, useRef } from 'react';
import iro from '@jaames/iro';
import { useState } from 'react';

export default function ColorPicker(props) {
  const  {color, onColorChange, aspect} = props;
  let colorPicker = useRef(false)
let loading = useRef(true)


useEffect(() => {
  if (loading.current) {
    colorPicker.current = new iro.ColorPicker('#picker', { color: "#f00" })
    colorPicker.current.on('color:change', function change(color) {
      onColorChange(color,aspect)
    });
  }
  loading.current = false
},[colorPicker, onColorChange, aspect])

useEffect(() => {
  if (!loading.current) {
    colorPicker.current.off('color:change')
    colorPicker.current.on('color:change', function change(color) {
      onColorChange(color,aspect)
    });
  }
},[colorPicker, onColorChange, aspect])



useEffect(() => { 
  if (!loading.current) {
  colorPicker.current.color.hexString = color
  }  
},[color])

  return (
    <div id='picker' ref={colorPicker} />
  )
}