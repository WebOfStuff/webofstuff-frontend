
import { useLayoutEffect, useState } from "react";
import { useTheme, icons } from "../Themes/ThemeContext";
import { shapes } from "./Shapes";


export default function Button(props) {
  const { id, className, shapeStrokeClass, circleFillClass, shapeFillClass, textClass, shape, text  } = props;
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
