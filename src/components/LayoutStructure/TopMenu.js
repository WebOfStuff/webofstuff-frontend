import React from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { ThemeChanger } from "../Base/ThemeChanger"


const TopMenu = ({ isVisible }) => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  return (
    <>
      <div id="Topmenu" className="h-[5vh] w-full">
        <div id="Personal" className="inline-block xl:mr-6 sm:mr-8 md:mr-8 mr-4">
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
                  Sign in
                </a>
              </>
            )}
            {session && (
              <>
                {session.user.image && (
                  <span
                    className=""
                  />
                )}
                <a
                  href={`/api/auth/signout`}
                  className=""
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Sign out
                </a>
              </>
            )}
          </p>
        </div>
        <ThemeChanger />
      </div>
    </>
  )
}
export default TopMenu