
export default function Button(props) {
  let { src, position, className, onClick, visible } = props;
 
  return (
    <>
      <img className={className} src={src} position={position} onClick={() => onClick()}></img>
    </>
  )
}

