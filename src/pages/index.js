import Walk from "./Walk"
import Discover from "./Discover"
import Overview from "./Overview"
import Options from "./Options"
import Player from '../components/Video/Player'
import { prisma } from '../lib/prisma';


export default function Home (props){
    return(  
    <div className="mt-10 flex flex-col items-center pb-24">
          <h1>Hello World!</h1>
        <Player {...props.videoJsOptions} />
      </div>
    )
  }


export async function getServerSideProps() {
const content = await prisma.contentsources.findFirst({
    where: {
        cs_id: 1
    }
});
 
const videoJsOptions = {
    techOrder: ['youtube'],
    autoplay: false,
    controls: true,
    sources: [
      {
        src: 'https://www.youtube.com/watch?v='+content.cs_url,
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


export { Walk, Discover, Options, Overview}
