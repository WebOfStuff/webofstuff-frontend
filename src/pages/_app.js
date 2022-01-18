import '../styles/globals.css'
import 'video.js/dist/video-js.css'
import 'videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css'
import { Agent } from 'https';
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

/*
const fs = require('fs');

const agent = new Agent({
  ca: fs.readFileSync('RootCA.crt'),
});

const networkInterface = createNetworkInterface({
  uri: "/api/graphql",
  opts: {
    agent,
  },
});

*/
const createApolloClient = () => {
  return new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache()
  });
};


export default function MyApp({ Component, pageProps: { session, ...pageProps }}) {
  return (
        <SessionProvider session={session}>
        <ApolloProvider client={createApolloClient()}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
    </SessionProvider>
  )
}
