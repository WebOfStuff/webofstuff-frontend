import React, { useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "./UserContext";
import { useTheme } from "../Themes/ThemeContext";
import { usePersonas } from "../Personas/PersonaContext";
import { applyTheme } from "../Themes/ThemeChanger";

export default function UserChanger(props) {
  const { data: session, status } = useSession();
  const { user, setUser } = useUser();
  const { personas, setPersonas } = usePersonas();
  const { theme, setTheme } = useTheme();

  const hydrateUserData = useCallback(async () => {
    hydrateUserDataFunction(session, setUser, setPersonas, setTheme)
  },
    [session, setUser, setPersonas, setTheme],
  );

  //TODO: set random User name

  useEffect(() => {
    if (session && !user) {
      hydrateUserData(session).catch(console.error)
    };
  }, [user, session, hydrateUserData]);

  return (
    <>
    </>
  )
}

export const fetchUserData = async (user) => {
  const deepUserResponse = await fetch('./api/user/findUnique?email=' + user.email, {
    method: 'GET',
  }).then(response => {
    return response.json();
  }).then(responseData => {
    return responseData
  })
  return deepUserResponse
}

export const hydrateUserDataFunction = async (session, setUser, setPersonas, setTheme) => {
  const userData = await fetchUserData(session.user).catch(console.error)
  setUser(userData)
  if (userData.userPersonas != 0) {
    setPersonas(userData.userPersonas)
    let themeToSet = userData.userPersonas[userData.currentPersona].persona.theme
    setTheme(themeToSet)
    applyTheme(themeToSet)
  } else {
    setPersonas([])
  }
}