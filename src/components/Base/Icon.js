
import { useLayoutEffect, useState } from "react";
import { useTheme, icons } from "../Themes/ThemeContext";


export default function Icon(props) {
  const { id, className, circle, shape, shapeStrokeClass, circleFillClass, shapeFillClass } = props;
  const {theme, setTheme} = useTheme()
  const fullClassName = className + " inline-block overflow-visible h-[5vh] w-[5vh] z-20 relative"
  const [curve, setCurve] = useState(shapes[shape]);
  const [circleFillColor, setCircleFillColor] = useState("#1AAA56");
  const [shapeStrokeColor, setShapeStrokeColor] = useState("white");
  const [shapeFillColor, setShapeFillColor] = useState("black");

  useLayoutEffect(() => {
    if (theme !== 0) {
      let color = theme[shapeStrokeClass]
      setShapeStrokeColor(color)
    } 
  }, [theme, shapeStrokeClass]);


  useLayoutEffect(() => {
    if (theme !== 0) {
      let color = theme[circleFillClass]
      setCircleFillColor(color)
    }
  }, [theme, circleFillClass]);

  useLayoutEffect(() => {
    if (theme !== 0) {
      let color = theme[shapeFillClass]
      setShapeFillColor(color)
    }
  }, [theme, shapeFillClass]);


  return (
    <>
      <svg id={id} xmlns="http://www.w3.org/2000/svg" className={fullClassName} viewBox="0 0 50 50">
        {circle && <circle cx="50%" cy="50%" r="50%" fill={circleFillColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}"/>}
         <g transform="translate(10,10)">
         <path stroke={shapeStrokeColor} fill={shapeFillColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d={curve} />
        </g> 
      </svg>
    </>
  )
}

const shapes = {
  add: "M25.979,12.896 19.312,12.896 19.312,6.229 12.647,6.229 12.647,12.896 5.979,12.896 5.979,19.562 12.647,19.562 12.647,26.229 19.312,26.229 19.312,19.562 25.979,19.562z",
  heart: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  ,
  delete: "M25.979,12.896,5.979,12.896,5.979,19.562,25.979,19.562z"




}