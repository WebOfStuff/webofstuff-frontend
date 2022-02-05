import '../styles/globals.css'
import 'video.js/dist/video-js.css'
import Layout from '../components/LayoutStructure/Layout'
import { SessionProvider } from "next-auth/react"
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import React, { useState } from 'react';
import { printIntrospectionSchema } from 'graphql'
import { ThemeProvider } from '../components/themes/theme-context'
import { PersonaContext } from '../components/personas/persona-context'

const client = new GraphQLClient({
  url: '/api/graphql'
})



export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [theme, setTheme] = useState("light");
  
  //const [persona, setPersona] = useState("Main");

/*   const personaContext = new PersonaContext({
    persona = persona,
    setPersona = setPersona,
  }) */

  /* const  ThemeContext() */
//const themeContext = <ThemeContext></ThemeContext>



  return (
    <SessionProvider session={session}>
      <ClientContext.Provider value={client}>
        {/* <PersonaContext.Provider persona={persona} setPersona={setPersona}> */}
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
       {/*  </PersonaContext.Provider> */}
      </ClientContext.Provider>
    </SessionProvider>
  )
}
