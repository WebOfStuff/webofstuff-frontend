import { ApolloServer, gql } from "apollo-server-micro";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import Cors from 'micro-cors'
import getTypeDefs from '../../lib/gqltypedefs';
import checkRightsForRequest from '../../components/Session/Rights/requestrights';
import { getSession } from "next-auth/react"

const cors = Cors({ allowMethods: ['PUT', 'POST'] })

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const typeDefs = getTypeDefs();

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const apolloServer = new ApolloServer({ schema: neoSchema.schema, introspection: true });

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  const session = await getSession({ req })
  const isAllowed = checkRightsForRequest(session, req)
  if (!isAllowed) {
    // Not Signed in
    res.status(401)
  }
  
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




