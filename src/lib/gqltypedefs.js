
export default function getTypeDefs()  {
  const typeDefs = `#graphql
  type Content {
    id: String
    title: String
    youtubeid: String
    playlists: [Playlist] @relationship(type: "INCLUDED_IN", direction: OUT, properties: "PlaylistContents")
  }

  type Playlist {
    name: String
    editmode: String
    contents: [Content] @relationship(type: "INCLUDED_IN", direction: IN, properties: "PlaylistContents")
    personas: [Persona] @relationship(type: "CONNECTED_TO", direction: OUT, properties: "PlaylistPersonas")
  }
  
  type Persona {
    name: String
    playlists: [Playlist] @relationship(type: "CONNECTED_TO", direction: IN, properties: "PlaylistPersonas")
  }

  interface PlaylistPersonas @relationshipProperties {
    role: String
  }

  interface PlaylistContents @relationshipProperties {
    position: Int
  }

  type Mutation {
    downtickHigherPositions(playlistName: String!, position: Int!): Playlist
        @cypher(
            statement: """
            MATCH (:Playlist {name:$playlistName})-[r:INCLUDED_IN]-(:Content)
            WHERE r.position > $position
            SET r.position = r.position - 1 
            RETURN r 
            """
        )
  }

  type Mutation {
    uptickHigherPositions(playlistName: String!, position: Int!): Playlist
        @cypher(
            statement: """
            MATCH (:Playlist {name:$playlistName})-[r:INCLUDED_IN]-(:Content)
            WHERE r.position > $position
            SET r.position = r.position + 1 
            RETURN r 
            """
        )
  }




`
  return typeDefs
}