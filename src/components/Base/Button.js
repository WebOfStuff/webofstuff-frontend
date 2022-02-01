
export default function Button(props) {
  let { src, position, className, onClick, visible } = props;
  className += " h-[5vh] w-[5vh] z-20 relative"

  return (
    <>
      <img className={className} src={src} position={position} onClick={() => onClick()}></img>
    </>
  )
}

