import Player from '../components/Video/Player'


export default function Home(props) {
  return (
    <div id="home2">
      Hello World!
      <Player {...props.videoJsOptions} />
    </div>
  )
}


export async function getServerSideProps() {
  
  /*const content = await prisma.contentsources.findFirst({
    where: {
      cs_id: 1
    }
  });*/

  const videoJsOptions = {
    techOrder: ['youtube'],
    autoplay: false,
    controls: true,
    sources: [
      {
        src: 'https://www.youtube.com/watch?v=1kWtASOC0Sc',
        type: 'video/youtube',
      },
    ],
  }

  return {
    props: {
      videoJsOptions: videoJsOptions
    }
  }
}

