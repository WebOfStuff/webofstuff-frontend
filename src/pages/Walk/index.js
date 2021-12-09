
import React from 'react';
import VideoArea from '../../components/Video/index';

const Walk = () => (
    <VideoArea enableThemeQueryParam hideDescription />
);

export default Walk;

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