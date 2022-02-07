
export default function getTypeDefs() {
  const typeDefs = `#graphql
  type Content {
    id: String!
    name: String!
    youtubeid: String
    playlists: [Playlist] @relationship(type: "INCLUDED_IN", direction: OUT, properties: "PlaylistContents")
    labels: [Label] @relationship(type: "IS", direction: IN, properties: "ContentLabels")
  }

  type Playlist {
    id: String!
    name: String!
    editmode: String
    contents: [Content] @relationship(type: "INCLUDED_IN", direction: IN, properties: "PlaylistContents")
    personas: [Persona] @relationship(type: "CONNECTED_TO", direction: OUT, properties: "PlaylistPersonas")
  }


  type Persona {
    id: String!
    name: String!
    playlists: [Playlist] @relationship(type: "CONNECTED_TO", direction: IN, properties: "PlaylistPersonas")
    user: String!
  }

  type Label {
    id: String!
    name: String!
    contents: [Content] @relationship(type: "IS", direction: OUT, properties: "ContentLabels")
  }

  interface ContentLabels @relationshipProperties {
    votedUpBy: [String] 
    votedDownBy: [String]  
    percentage: String
  }

  interface PlaylistPersonas @relationshipProperties {
    role: String
  }

  interface PlaylistContents @relationshipProperties {
    position: Int
  }

  interface UserPersonas @relationshipProperties {
    favorite: Boolean
  }

  type Mutation {
    addContentToPlaylist(contentId: String!, playlistName: String!, position: Int!): Playlist
         @cypher(
            statement: """
            MATCH (p:Playlist {name:$playlistName}),(c:Content  {id:$contentId}})
            CreateOrConnect c-[r:INCLUDED_IN {position:$position}]->p
            RETURN p
            """
          )
  }


  type Mutation {
    downtickHigherPositions(playlistName: String!, position: Int!): Playlist
        @cypher(
            statement: """
            MATCH (p:Playlist {name:$playlistName})-[r:INCLUDED_IN]-(:Content)
            WHERE r.position > $position
            SET r.position = r.position - 1 
            RETURN p 
            """
        )
  }

  type Mutation {
    uptickPlaylistStartingAtPosition(playlistName: String!, position: Int!): Playlist
        @cypher(
            statement: """
            MATCH (p:Playlist {name:$playlistName})-[r:INCLUDED_IN]-(:Content)
            WHERE r.position >= $position
            SET r.position = r.position + 1 
            RETURN p
            """
        )
  }
`
  return typeDefs
}

/*  type Mutation {
  CreatePersonas($input: [PersonaCreateInput!]!): Persona
     createPersonas(input: $input) {
    personas {
    id
    name
    User
    playlists() {
      id
      name
    }
  }
}  */