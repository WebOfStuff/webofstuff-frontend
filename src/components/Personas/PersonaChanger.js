import React, { useEffect, useState, useCallback } from "react";
import { usePersonas } from "./PersonaContext";
import { useUser } from "../User/UserContext";
import { v4 } from "uuid";
import createPhrase from "../Base/WordGen/phrasegen";
import { applyTheme } from "../Themes/ThemeChanger";
import { useSession } from "next-auth/react";
import { useTheme } from "../Themes/ThemeContext";
import { fetchUserData } from "../User/UserChanger";
import { chooseRandomTheme } from "../Themes/ThemeContext";

export default function PersonaChanger(props) {
  const { data: session, status } = useSession();
  const { user, setUser } = useUser();
  const { personas, setPersonas, personasChange, setPersonasChange, firstPersonaCreated, setFirstPersonaCreated } = usePersonas();
  const { theme, setTheme } = useTheme();
  const [personaList, setPersonaList] = useState([]);

  //Create a new Persona if the user currently doesn't have one
  useEffect(() => {
    if (user  && Array.isArray(personas) && !personas.length && firstPersonaCreated == false) {
      setFirstPersonaCreated(true)
     let personaName = "Main"+ user.id
      createNewPersona( user, setUser, personaName, personas, setPersonas)
    }
  }, [user, personas,firstPersonaCreated, setFirstPersonaCreated,setPersonas,setUser])

  //Create the persona dropdown if personas were loaded 
  useEffect(() => {
    if (Array.isArray(personas) && personas.length) {
      setPersonaList(personas.map((userPersonaInList, index) => {
        let personaData = userPersonaInList.persona
        let className = ""
        if (index == user?.currentPersona) {
          className = "active";
        }
        return (
          <li key={personaData.id}>
            <a className={className} tabIndex="0" onClick={(e) => { switchPersona(user.id, index, personas, setUser) }}> {personaData.personaName}</a>
          </li>
        )
      })
      )
    }
  }, [user, personas, setPersonaList, setUser]);

  let randomPersonaName = createPhrase("persona")

  if (user && personas) {
    return (
      <>
        <div title="Change Persona" className="dropdown">
          <div tabIndex="0" className="btn btn-primary m-1 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 mr-2 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
            <label className="inline-block text-left leading-5">
              PERSONA:<br />
              {personas[user?.currentPersona]?.persona?.personaName}
            </label>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1792 1792" className="inline-block w-5 mr-2 stroke-current">
              <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z">
              </path>
            </svg>
          </div>
          <div className="mt-[6vh] overflow-y-auto shadow-2xl top-px dropdown-content h-auto w-52 rounded-b-box bg-base-100 text-base-content">
            <ul className="p-4 menu compact">
              <form onSubmit={async (event) => { createNewPersonafromButton(event, user, setUser, personas, setPersonas) }} className="form-control">
                <div className="flex flex-row space-x-2">
                  <input name="newPersonaTextField" type="text" defaultValue={randomPersonaName} className="w-4/6 input input-primary" />
                  <button className="w-1/6 btn btn-secondary">+</button>
                </div>
              </form>
              {personaList}
            </ul>
          </div>
        </div>
      </>
    )
  } else {
    return <></>
  }

}


const switchPersona = async (id, currentPersona, personas, setUser) => {
  const userData = await fetch('/api/user/update?id=' + id, {
    method: 'post',
    body: JSON.stringify({ currentPersona: currentPersona }),
  }).then(response => response.json())
    .then(data => {

      return data
    })
  setUser(userData)
  applyTheme(personas[userData.currentPersona].persona.theme)
  document.documentElement.setAttribute("data-persona", personas[currentPersona].id);
  localStorage.setItem("persona", personas[currentPersona].id);
};

const createNewPersonafromButton = async (event, user, setUser, personas, setPersonas) => {
  // create Persona
  event.preventDefault();
  let persona = personas[user.currentPersona].persona
  let personaName = event.target.newPersonaTextField.value
  createNewPersona(user, setUser, personaName, personas, setPersonas)
  let deepUser = await fetchUserData(user)
  setPersonas(deepUser.userPersonas)
}


export const createNewPersona = async ( user, setUser, personaName, personas, setPersonas) => {
  debugger;
  let generatedPersonaId = v4()
  let payload = {
    data: {
      id: generatedPersonaId,
      personaName: personaName,
      currentPlaylist: personaName,
      theme: {
        connect: {
          themeName: "Welcome"
        }
      },
      // maybe should be current Theme instead?
      ownerUserId: user.id,
      users: {
        create: {
          assignedBy: "TabulaRasa",
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      },
    }
  }
  try {
    const newPersona = await fetch('/api/persona/create', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(response => {
      if (response != undefined) {
        if (personas == 0) {
          personas = [response.personaData]
        } else {
          personas.push(response.personaData)
        }
        setPersonas(personas)
        let newUser = user
        newUser.currentPersona = 0
        setUser(newUser)
      }
      return { payload, response }
    })
  } catch (e) {
    console.log(e.code)
    throw e
  }
};