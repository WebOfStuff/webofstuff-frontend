import React from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"


const LeftMenu = ({ isVisible }) => {
  const { data: session, status } = useSession()



  const loading = status === "loading"
  if (loading) return 'Loading...';
  const sessionConst = "/" + session?.user?.email;
  return (
    <div className="block absolute w-48" >
      <div className="menu rounded-tr-base rounded-tl-base px-4 py-4 w-full">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href={sessionConst}>Walk</Link>
          </li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Discover">Discover</Link></li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Overview">Overview</Link></li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Options">Options</Link></li>
        </ul>
      </div>
    </div>)
}
export default LeftMenu