import '../styles/globals.css'
import 'video.js/dist/video-js.css'
import 'videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css'
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react"
import { GraphQLClient, ClientContext } from 'graphql-hooks'


const client = new GraphQLClient({
  url: '/api/graphql'
})


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ClientContext.Provider value={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ClientContext.Provider>
    </SessionProvider>
  )
}
