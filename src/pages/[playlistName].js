 
import { React } from 'react';
import { PlaylistProvider } from '../components/Playlist/PlaylistContext';
import PlaylistEditor from '../components/Playlist/PlaylistEditor';
import { useRouter } from 'next/router';


export default function Walk(props) {
  const router = useRouter();
  return (
    <>
      <PlaylistProvider query={router.query}>
       <PlaylistEditor query={router.query}/>
      </PlaylistProvider>
    </>
  )
}

export async function getStaticProps({ params }) {
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
