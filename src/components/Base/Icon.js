import Image from "next/image";
import { useLayoutEffect, useState } from "react";



export default function Icon(props) {
  let { id, className, circle, shape } = props;
  const { theme, strokeClass, circleClass } = props;
  className += " inline-block overflow-visible h-[5vh] w-[5vh] z-20 relative"
  const [curve, setCurve] = useState(shapes[shape]);
  const [circleColor, setCircleColor] = useState("black");
  const [strokeColor, setStrokeColor] = useState("white");

  useLayoutEffect(() => {
    if (theme !== null && theme !== undefined) {
      let { strokeClass } = props
      let themestring = "[data-theme=" + theme + "]"
      const themes = require('daisyui/colors/themes');
      setStrokeColor(themes[themestring][strokeClass])
    }
  }, [theme, strokeClass]);
  useLayoutEffect(() => {
    if (theme !== null && theme !== undefined) {
      let { circleClass } = props
      let themestring = "[data-theme=" + theme + "]"
      const themes = require('daisyui/colors/themes');
      setCircleColor(themes[themestring][circleClass])
    }
  }, [theme, circleClass]);




  //let circleColor, strokeColor;
  return (
    <>
      <svg id={id} xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 50 50">
        {circle && <circle cx="50%" cy="50%" r="50%" fill={circleColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" className="text-neutral" />}
        {/* <g transform="translate(10,10)">
         <path className="translate-x-1/4 translate-y-1/4" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d={curve} />
        </g> */}
      </svg>
    </>
  )
}

const shapes = {
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  ,
  delete: "M1312.5,703.125c-0,-51.777 -41.972,-93.75 -93.75,-93.75l-187.5,-0c-51.777,-0 -93.75,41.973 -93.75,93.75l-140.625,-0c-25.888,-0 -46.875,20.987 -46.875,46.875l750,-0c-0,-25.888 -20.986,-46.875 -46.875,-46.875l-140.625,-0Zm-518.092,90.03l659.547,-0l-32.902,788.407c0,0 -12.417,59.063 -59.231,59.063l-473.684,-0c-46.796,-0 -59.21,-59.063 -59.21,-59.063l-34.52,-788.407Zm513.404,97.47l-46.875,-0l-23.437,676.767l46.875,-0l23.437,-676.767Zm-300,676.767l-23.429,-676.767l-46.883,-0l23.43,676.767l46.882,-0Zm93.75,-676.767l0,676.767l46.875,-0l0,-676.767l-46.875,-0Z"




}