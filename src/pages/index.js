import Player from '../components/Video/Player'


export default function Home(props) {

  let playlistData = []

  return (
    <div id="home2" className='flex flex-row w-[60vw]'>
      Hello World!
      <Player playerName="Welcome" className="flex-initial w-100" position="1" playlistData={playlistData}  />
    </div>
  )
}


