import React , {useState, useEffect} from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { findPlaylistName } from "../Playlist/Playlist"
import { usePersonas } from "../Personas/PersonaContext"
import { useUser } from "../User/UserContext"


const LeftMenu = ({ isVisible }) => {
  const { user } = useUser();
  const { personas } = usePersonas();
  const [playlistName, setPlaylistName] = useState();

  useEffect(() => {
    if (user && personas) {
    setPlaylistName(findPlaylistName(user, personas))
    }
  }, [personas,user]);
 


  return (
    <div className="block absolute w-48" >
      <div className="menu rounded-tr-base rounded-tl-base px-4 py-4 w-full">
        <ul>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4">
            <Link href="/">Home</Link>
          </li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4">
            <Link href={"/"+playlistName}>Playlist</Link>
          </li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/youtubeImporter">Import</Link></li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/theme">Theme</Link></li>
        </ul>
      </div>
    </div>)
}
export default LeftMenu