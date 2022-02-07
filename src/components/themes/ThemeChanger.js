import React, { useEffect, useContext } from "react";
import { useTheme, themes, icons } from "./ThemeContext";
import { useSession } from "next-auth/react";


export function ThemeChanger(props) {
  const { data: session, status } = useSession()
  const { state: theme, dispatch: setTheme } = useTheme();
  let currentPersona = session?.user?.currentPersona

  useEffect(() => {
    async function setThemeInDB(id, theme) {
      const persona = await fetch('/api/persona/update?id=' + id, {
        method: 'post',
        body: JSON.stringify({ currentTheme: theme }),
      })
    }
    if (session) {
      let currentPersona = session?.user?.currentPersona
      setTheme(session?.user?.personas[currentPersona]?.currentTheme)
      setThemeInDB(session?.user?.personas[currentPersona].id, theme);
    }
  }, [session, setTheme, theme]);




  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);


  let themesList = themes.map((themeInList, index) => {
    let className = ""
    if (themeInList == theme) {
      className = "active";
    }
    return (
      <li key={themeInList} >
        <a className={className} tabIndex="0" onClick={(e) => { setTheme(themeInList); setThemeInDBOnClick(session?.user?.personas[currentPersona].id, themeInList) }}>{icons[index]} {themeInList}</a>
      </li>
    )
  });

  return (
    <>
      <div title="Change Theme" className="dropdown dropdown-end">
        <div tabIndex="0" className="btn btn-ghost btn-sm rounded-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 mr-2 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
          </svg>
          <span className="hidden md:inline">
            THEME
          </span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1792 1792" className="inline-block w-5 mr-2 stroke-current">
            <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z">
            </path></svg></div>
        <div className="mt-[3vh] overflow-y-auto shadow-2xl top-px dropdown-content h-96 w-52 rounded-b-box bg-base-200 text-base-content">
          <ul className="p-4 menu compact">
            {themesList}
          </ul>
        </div>
      </div>
    </>
  )
}

async function setThemeInDBOnClick(id, theme) {
  const persona = await fetch('/api/persona/update?id=' + id, {
    method: 'post',
    body: JSON.stringify({ currentTheme: theme }),
  })
}
