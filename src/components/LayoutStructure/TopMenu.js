import React from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import ThemeChanger from "../Themes/ThemeChanger"
import PersonaChanger from "../Personas/PersonaChanger"
import UserChanger from "../User/UserChanger"

export default function TopMenu(props) {
  
  const { data: session, status } = useSession()
  const loading = status === "loading"
  return (
    <>
      <div id="Topmenu" className="w-full h-[7.5vh]">
        <div className="navbar">
          
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">
              daisyUI
            </span>
          </div>
          <div className="flex-none hidden px-2 mx-2 lg:flex ">
            <div className="flex items-stretch">
              <PersonaChanger />

              <a className="btn btn-primary m-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 mr-2 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorites
              </a>
              <a className="btn btn-primary m-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 mr-2 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
              </a>
              <ThemeChanger />
              <div id="topbuffer" className="width"></div>
            </div>
          </div>
          <UserChanger />
          <div id="Personal" className="btn btn-primary m-1">
            <p className="Login">
              {!session && (
                <>
                  <a href={`/api/auth/signin`} className="" onClick={(e) => { e.preventDefault(); signIn(); }}>
                    Sign in
                  </a>
                </>
              )}
              {session && (
                <>
                  <a href={`/api/auth/signout`} className="" onClick={(e) => { e.preventDefault(); signOut() }}>
                    Sign out
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}