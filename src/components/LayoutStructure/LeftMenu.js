import React from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { findPlaylistName } from "../Playlist/Playlist"


const LeftMenu = ({ isVisible }) => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  if (loading) return 'Loading...';
  let playlistName = findPlaylistName(session)

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