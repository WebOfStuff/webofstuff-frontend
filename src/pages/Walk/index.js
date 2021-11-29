import { prisma } from '../../lib/prisma';
import Player from '../../components/Video/Player'
import { useRouter } from 'next/router';

export default function Walk(props){
  return(  
    <div className="mt-10 flex flex-col items-center pb-24">
          <h1>Walk this way! {props.message}</h1>
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
            src: 'https://www.youtube.com/watch?v=4c8O2n1Gfto',
            type: 'video/youtube',
          },
        ],
      }
    
      return {
        props: {
            videoJsOptions: videoJsOptions,
            message: 'blaaa'
      }
    }
}