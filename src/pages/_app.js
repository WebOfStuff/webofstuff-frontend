import '../styles/globals.css'
import 'video.js/dist/video-js.css'
import Layout from '../components/LayoutStructure/Layout'
import { SessionProvider } from "next-auth/react"
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import React, { useState } from 'react';
import { printIntrospectionSchema } from 'graphql'
import { ThemeProvider } from '../components/Themes/ThemeContext'
import { PersonaProvider } from '../components/Personas/PersonaContext'
import { UserProvider } from '../components/User/UserContext'

const client = new GraphQLClient({
  url: '/api/graphql'
})



export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (

    <ClientContext.Provider value={client}>
      <SessionProvider session={session}>
        <UserProvider>
          <PersonaProvider>
            <ThemeProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </PersonaProvider>
        </UserProvider>
      </SessionProvider>
    </ClientContext.Provider>
  )
}
