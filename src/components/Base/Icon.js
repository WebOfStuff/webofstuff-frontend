
import { useLayoutEffect, useState } from "react";
import { useTheme, icons } from "../Themes/ThemeContext";


export default function Icon(props) {
  const { id, className, circle, shape, strokeClass, circleClass, iconClass } = props;
  const {theme, setTheme} = useTheme()
  const fullClassName = className + " inline-block overflow-visible h-[5vh] w-[5vh] z-20 relative"
  const [curve, setCurve] = useState(shapes[shape]);
  const [circleColor, setCircleColor] = useState("#1AAA56");
  const [strokeColor, setStrokeColor] = useState("white");
  const [iconColor, setIconColor] = useState("black");

  useLayoutEffect(() => {
    if (theme !== 0) {
      let color = theme[strokeClass]
      setStrokeColor(color)
    }
  }, [theme, strokeClass]);


  useLayoutEffect(() => {
    if (theme !== 0) {
      let color = theme[circleClass]
      setCircleColor(color)
    }
  }, [theme, circleClass]);

  useLayoutEffect(() => {
    if (theme !== 0) {
      let color = theme[iconClass]
      setIconColor(color)
    }
  }, [theme, iconClass]);


  return (
    <>
      <svg id={id} xmlns="http://www.w3.org/2000/svg" className={fullClassName} viewBox="0 0 50 50">
        {circle && <circle cx="50%" cy="50%" r="50%" fill={circleColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" className="text-neutral" />}
         <g transform="translate(10,10)">
         <path className="" stroke={strokeColor} fill={iconColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d={curve} />
        </g> 
      </svg>
    </>
  )
}

const shapes = {
  add: "M25.979,12.896 19.312,12.896 19.312,6.229 12.647,6.229 12.647,12.896 5.979,12.896 5.979,19.562 12.647,19.562 12.647,26.229 19.312,26.229 19.312,19.562 25.979,19.562z",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  ,
  delete: "M1312.5,703.125c-0,-51.777 -41.972,-93.75 -93.75,-93.75l-187.5,-0c-51.777,-0 -93.75,41.973 -93.75,93.75l-140.625,-0c-25.888,-0 -46.875,20.987 -46.875,46.875l750,-0c-0,-25.888 -20.986,-46.875 -46.875,-46.875l-140.625,-0Zm-518.092,90.03l659.547,-0l-32.902,788.407c0,0 -12.417,59.063 -59.231,59.063l-473.684,-0c-46.796,-0 -59.21,-59.063 -59.21,-59.063l-34.52,-788.407Zm513.404,97.47l-46.875,-0l-23.437,676.767l46.875,-0l23.437,-676.767Zm-300,676.767l-23.429,-676.767l-46.883,-0l23.43,676.767l46.882,-0Zm93.75,-676.767l0,676.767l46.875,-0l0,-676.767l-46.875,-0Z"




}