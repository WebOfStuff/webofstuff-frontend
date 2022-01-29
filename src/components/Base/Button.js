
export default function Button(props) {
  let { src, position, className, onClick } = props;

  return (
    <>
      <img className={className} src={src} position={position} onClick={() => onClick()}></img>
    </>
  )
}

