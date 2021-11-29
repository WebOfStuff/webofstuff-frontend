import '../assets/main.css'
import 'video.js/dist/video-js.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp;

