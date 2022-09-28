import React, { useEffect } from "react";
import { useTheme, themes, icons } from "./ThemeContext";
import { usePersonas } from "../Personas/PersonaContext";
import { useUser } from "../User/UserContext";
import ColorsDaisyUI from "../Base/Colors/ColorsDaisyUI";
import { makeCamelCase } from "../Base/String";
import { hexToHSL } from "../Base/Colors/Colors";


export default function ThemeChanger(props) {
  const { user, setUser } = useUser()
  const { theme, setTheme } = useTheme();
  const { personas, setPersonas } = usePersonas();

  useEffect(() => {
    if (Array.isArray(personas) && personas.length && theme && personas[user?.currentPersona]?.persona?.theme?.themeName != theme.themeName) {
      let themeToSet = personas[user.currentPersona].persona.theme
      setTheme(themeToSet)
      applyTheme(themeToSet)
    }
  }, [user, personas, setTheme, theme]);

  let themesList = themes.map((themeInList, index) => {
    let className = ""
    if (themeInList == theme.themeName) {
      className = "active";
    }
    return (
      <li key={themeInList} >
        <a className={className} tabIndex="0" onClick={(e) => { setThemeInDB(user, personas, themeInList, setPersonas, setTheme, applyTheme) }}>{icons[index]} {themeInList}</a>
      </li>
    )
  });
if (theme) {
  return (
    <>
      <div title="Change Theme" className="dropdown">
        <div tabIndex="0" className="btn btn-primary m-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 mr-2 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
          </svg>
          <span className="inline-block text-left leading-5">
            THEME: <br />
            {theme.themeName}


          </span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1792 1792" className="inline-block w-5 mr-2 stroke-current">
            <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z">
            </path></svg></div>
        <div className="mt-[6vh] overflow-y-auto shadow-2xl top-px dropdown-content h-auto w-52 rounded-b-box bg-base-100 text-base-content">
          <ul className="p-4 menu compact">
            {themesList}
          </ul>
        </div>
      </div>
    </>
  )
} else return(<></>)
}

async function setThemeInDB(user, personas, themeInList, setPersonas, setTheme, applyTheme) {


  let userPersona = personas[user.currentPersona]
  let personaId = userPersona.persona.id
  let newPersonas = personas
  const personaData = await fetch('/api/persona/update?id=' + personaId, {
    method: 'POST',
    body: JSON.stringify({
      theme: {
        connect: {
          themeName: themeInList,
        }
      },
    }),
  })
  if (personaData.ok) {
    const personaJson = await personaData.json().then(persona => {
      applyTheme(persona.theme)
      setTheme(persona.theme)
      newPersonas[user.currentPersona].persona = persona
      setPersonas(newPersonas)
      return persona
    });
  }
}


export function applyTheme(theme) {
  let changeCategories = ColorsDaisyUI();
  for (const category in changeCategories) {
    let changeAspects = changeCategories[category]
    for (const changeAspect in changeAspects) {
      let property = makeCamelCase(changeAspect)
      let valueOfProperty = hexToHSL(theme[property])
      document.documentElement.style.setProperty(changeAspects[changeAspect], valueOfProperty );
      
    }
  }
}


