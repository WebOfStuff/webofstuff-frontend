import React from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"


const LeftMenu = ({ isVisible }) => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  return (
    <div className="block absolute w-48" >
      <div className="mt-4 rounded-tr-base rounded-tl-base bg-gray-50 px-4 py-4 w-full">
        <ul>

          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/">Home</Link></li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Walk">Walk</Link></li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"> <div id="Personal" className="xl:mr-6 sm:mr-8 md:mr-8 mr-4">
            <p className="Login">
              {!session && (
                <>
                  <a
                    href={`/api/auth/signin`}
                    className=""
                    onClick={(e) => {
                      e.preventDefault()
                      signIn()
                    }}
                  >
                    Personal
                  </a>
                </>
              )}
              {session && (
                <>
                  <Link href="/Personal">Personal</Link>
                </>
              )}
            </p>
          </div>
          </li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Discover">Discover</Link></li>
          <li className="xl:mr-6 sm:mr-8 md:mr-8 mr-4"><Link href="/Options">Options</Link></li>
        </ul>
      </div>
    </div>)
}
export default LeftMenu