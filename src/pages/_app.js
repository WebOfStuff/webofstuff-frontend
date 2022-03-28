import '../styles/globals.css'
import 'video.js/dist/video-js.css'
import Layout from '../components/LayoutStructure/Layout'
import { SessionProvider } from "next-auth/react"
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import React, { useState } from 'react';
import { printIntrospectionSchema } from 'graphql'
import { ThemeProvider } from '../components/Themes/ThemeContext'
import { PersonaProvider } from '../components/Personas/PersonaContext'

const client = new GraphQLClient({
  url: '/api/graphql'
})



export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ClientContext.Provider value={client}>
        <PersonaProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </PersonaProvider>
      </ClientContext.Provider>
    </SessionProvider>
  )
}
