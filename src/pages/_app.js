import '../assets/main.css'
import 'video.js/dist/video-js.css'
import 'videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css'
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react"
import {ApolloProvider, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  const link = new HttpLink({
    uri: "/api/graphql",
  });



  return new ApolloClient({
    link,
    uri: "/api/graphql",
    cache: new InMemoryCache()
  });
};


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // <SessionProvider session={session}>
    <ApolloProvider client={createApolloClient()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
    //  </SessionProvider>
  )
}

export default MyApp;
