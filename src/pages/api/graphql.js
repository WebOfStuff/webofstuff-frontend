import { ApolloServer, gql} from "apollo-server-micro";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import Cors from 'micro-cors'

const cors = Cors({ allowMethods: ['PUT', 'POST'] })

const typeDefs = gql`
    type Content {
        title: String
        youtubeid: String
        playlists: [Playlist] @relationship(type: "INCLUDED_IN", direction: OUT, properties: "PlaylistElements")
    }

    type Playlist {
        name: String
        elements: [Content] @relationship(type: "INCLUDED_IN", direction: IN, properties: "PlaylistElements")
    }
    
    interface PlaylistElements @relationshipProperties {
        position: Int
    }
`;


const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);


const neoSchema = new Neo4jGraphQL({ typeDefs, driver});

const apolloServer = new ApolloServer({ schema: neoSchema.schema, introspection: true  });

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
    await startServer;
    await apolloServer.createHandler({
      path: "/api/graphql",
    })(req, res);
  })

export const config = {
  api: {
    bodyParser: false,
  },
};




