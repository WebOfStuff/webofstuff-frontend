
import { React } from 'react';
import { PlaylistProvider } from '../../components/Playlist/PlaylistContext';
import { ContentProvider } from '../../components/Content/ContentContext';
import ContentEditor from '../../components/Content/ContentEditor';
import { useRouter } from 'next/router';


export default function Content(props) {
  const router = useRouter();
  const [inPlaylist, setInPlaylist] = useState(router?.query?.PlaylistName); // ??

  let contentName, view, query;
  if (router !== undefined && !isEmptyObj(router.query)) {
    const contentNameArray = router?.query?.contentName
    if (contentNameArray !== undefined) {
      contentName = contentNameArray[0]
    }
    query = router?.query
    view = query?.view
    setInPlaylist(true)


    return (
      <>
        {inPlaylist &&
          <PlaylistProvider query={query}>
            <ContentProvider query={query}>
              <ContentEditor view={view} />
            </ContentProvider>
          </PlaylistProvider>
        }
        {!inPlaylist &&
          <ContentProvider query={query}>
            <ContentEditor view={view} />
          </ContentProvider>
        }
      </>
    )
  } else {
    return (<></>)
  }

  function isEmptyObj(obj) {
    if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
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