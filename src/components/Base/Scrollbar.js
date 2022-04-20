
import { useLayoutEffect, useState } from "react";
import { useTheme, icons } from "../Themes/ThemeContext";


export default function Scrollbar(props) {
  return (
    <>
     <div id="Scrollbar" className = "scrollbar w-1/12 bg-tertiary">
       <div id = "Scroller" className = "w-1/12 bg-primary"></div>
     </div>
    </>
  )
}