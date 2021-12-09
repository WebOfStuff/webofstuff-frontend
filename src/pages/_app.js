import '../assets/main.css'
import 'video.js/dist/video-js.css'
import 'videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css'
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component,pageProps: { session, ...pageProps } }) {
  return (
   // <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
  //  </SessionProvider>
  )
}

export default MyApp;

