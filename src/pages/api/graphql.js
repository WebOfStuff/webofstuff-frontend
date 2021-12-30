import { ApolloServer} from "apollo-server-micro";
import { Neo4jGraphQL, Neo4jGraphQLConfig } from "@neo4j/graphql";
import { gql } from "@apollo/client"
import neo4j from "neo4j-driver";


const typeDefs = gql`
    type Content {
        title: String
        playlists: [Playlist] @relationship(type: "INCLUDED_IN", direction: IN, properties: "PlaylistElements")
    }
    type Playlist {
        name: String
        elements: [Content] @relationship(type: "INCLUDED_IN", direction: OUT, properties: "PlaylistElements")
    }
    interface PlaylistElements @relationshipProperties {
        position: [Int]
    }
`;


const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);


const neoSchema = new Neo4jGraphQL({ typeDefs, driver});

const apolloServer = new ApolloServer({ schema: neoSchema.schema });

const startServer = apolloServer.start();

export default async function handler(req, res) {

    await startServer;
    await apolloServer.createHandler({
      path: "/api/graphql",
    })(req, res);
  }

export const config = {
  api: {
    bodyParser: false,
  },
};




