import Player from '../components/Video/Player'


export default function Home(props) {

  let playlistData = []

  return (
    <div id="home2">
      Hello World!
      <Player playlistData={playlistData}  />
    </div>
  )
}


