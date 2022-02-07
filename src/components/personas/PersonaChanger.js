import React, { useEffect, useContext } from "react";
import { usePersona } from "./PersonaContext";
import { useSession } from "next-auth/react";

export function PersonaChanger(props) {
  const { data: session, status } = useSession()
  const { state: persona, dispatch: setPersona } = usePersona();

  useEffect(() => {
    async function setPersonaInDB (email, persona){
      const user = await fetch('/api/user/update?email=' + email, {
        method: 'post',
        body: JSON.stringify({ currentPersona: persona }),
      })
    };
    if (session) {
      setPersona(session?.user?.currentPersona)
      setPersonaInDB(session?.user?.email, persona)
    }
  }, [session, setPersona, persona]);

  useEffect(() => {
    document.documentElement.setAttribute("data-persona", persona);
    localStorage.setItem("persona", persona);
  }, [persona]);

  if (session?.user?.personas) {
    const personaArray = Object.entries(session?.user?.personas);
    let personasList = personaArray.map((personaInList, index) => {
      let personaData= personaInList[1];
      let className = ""
      if (personaData.name == persona) {
        className = "active";
      }
      return (
        <li key={personaData.id}>
          <a className={className} tabIndex="0" onClick={(e) => { setPersona(personaData.name); setPersonaInDBOnClick(session?.user?.email, personaData.name) }}> {personaData.name}</a>
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
              {personasList}
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
