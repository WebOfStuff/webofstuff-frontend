import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from "@apollo/server";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import getTypeDefs from '../../lib/gqltypedefs';

const typeDefs = getTypeDefs();
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);
const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const initServer = async () => {
  return await neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
      schema
    });
    return startServerAndCreateNextHandler(server)
  });
};


export default async function handler(req, res) {
  const apolloServerHandler = await initServer();
/*   req.on('data', function(chunk) {
    body.push(chunk);
}).on('end', function() {
    body = Buffer.concat(body).toString();
    if (body) console.log(JSON.parse(body));
    res.end('It Works!!');
}); */
  return apolloServerHandler(req, res)
};

