
import { React } from 'react';
import { PlaylistProvider } from '../components/Playlist/PlaylistContext';
import PlaylistEditor from '../components/Playlist/PlaylistEditor';
import { useRouter } from 'next/router';


export default function Playlist(props) {
  const router = useRouter();

  let playlistName, view, query;
  if (router !== undefined && !isEmptyObj(router.query)) {
    const playlistNameArray = router?.query?.playlistName
    if (playlistNameArray !== undefined) {
      playlistName = playlistNameArray[0]
    }
    query = router.query
    view = router?.query?.view


    return (
      <>
        <PlaylistProvider initialPlaylistName={playlistName} query={query}>
          <PlaylistEditor view={view} />
        </PlaylistProvider>
      </>
    )
  } else {
    return (<></>)
  }

  function isEmptyObj(obj) {
   if ( obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
     return true
   } else {
     return false
   }
  }
}
/* export async function getStaticProps({ params }) {
  let me;
  return { props: { params, fallback: false } }
}

export async function getStaticPaths() {
  let meagain;
  return {
    paths: [
      { params: { playlistName: "aseftalangi@gmail.com" } }
    ],
    fallback: false // false or 'blocking'
  };
}
 */