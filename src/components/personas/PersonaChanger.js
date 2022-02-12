import React, { useEffect, useContext } from "react";
import { usePersona } from "./PersonaContext";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

export default function PersonaChanger(props) {
  const { data: session, status } = useSession()
  const { state: persona, dispatch: setPersona } = usePersona();

  useEffect(() => {
    if (session) {
      setPersona(session?.user?.currentPersona)
      setPersonaInDB()
    }
    async function setPersonaInDB() {
      const user = await fetch('/api/user/update?id=' + session.user.id, {
        method: 'post',
        body: JSON.stringify({ currentPersona: persona }),
      })
    };

  }, [session, setPersona, persona]);

  useEffect(() => {
    document.documentElement.setAttribute("data-persona", persona);
    localStorage.setItem("persona", persona);
  }, [persona]);

  if (session?.user?.userPersonas) {
    const personaArray = Object.values(session?.user?.userPersonas);
    let personaList = personaArray.map((userPersonaInList, index) => {
      let personaData = userPersonaInList.persona
      let className = ""
      if (index == persona) {
        className = "active";
      }
      return (
        <li key={personaData.id}>
          <a className={className} tabIndex="0" onClick={(e) => { setPersona(index); setPersonaInDBOnClick(session?.user?.email, index) }}> {personaData.name}</a>
        </li>
      )
    });

    return (
      <>
        <div title="Change Persona" className="dropdown dropdown-end">
          <div tabIndex="0" className="btn btn-ghost btn-sm rounded-btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 mr-2 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
            <span className="hidden md:inline">
              PERSONA
            </span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1792 1792" className="inline-block w-5 mr-2 stroke-current">
              <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z">
              </path></svg></div>
          <div className="mt-[3vh] overflow-y-auto shadow-2xl top-px dropdown-content h-auto w-52 rounded-b-box bg-base-100 text-base-content">
            <ul className="p-4 menu compact">
              <form onSubmit={async (event) => {createNewPersonafromButton(event,session)}} className="form-control">
                <li className="flex flex-row space-x-2">
                  <input name="newPersonaTextField" type="text" placeholder={"New name"} className="w-4/6 input input-primary" /> {/* TODO: Add random personaName */}
                  <button className="w-1/6 btn btn-tertiary">+</button>
                </li>
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

const setPersonaInDBOnClick = async (email, persona) => {
  const user = await fetch('/api/user/update?email=' + email, {
    method: 'post',
    body: JSON.stringify({ currentPersona: persona }),
  })
};

const createNewPersonafromButton = async (event, session) => {
  // create Persona
  let userId = session?.user?.id
  let personaId = v4()
  let personaName = event.target.newPersonaTextField.value
  let currentPlaylist = session?.user?.userPersonas[session?.user?.currentPersona]?.currentPlaylist
  let theme = session?.user?.userPersonas[session?.user?.currentPersona]?.currentTheme
  let assignedBy = user.id
  createNewPersona(event, userId, personaId, personaName, currentPlaylist, theme, assignedBy)  
}


export const createNewPersona = async (event, userId, personaId, personaName, currentPlaylist, theme, assignedBy) => {
  let payload = {
    data: {
      id: personaId,
      name: personaName, 
      currentPlaylist: currentPlaylist,
      theme: {
        connect: {
          name: theme
        }
      },
      // maybe should be current Theme instead?
      ownerId: userId,
      users: {
        create: {
          assignedBy: assignedBy,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      },
    },
    include: {
      users: true,
      theme: true
    },
  }
  try {
    const newPersona = await fetch(process.env.URL + 'api/persona/create', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return { payload, newPersona }
  } catch (e) {
    console.log(e.code)
    throw e
  }
};