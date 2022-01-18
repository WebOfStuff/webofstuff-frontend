import {gql} from "apollo-server-micro";

// TODO: get plugin for VSCode 
export default function getTypeDefs()  {
  const typeDefs = gql`
  type Content {
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
`
  return typeDefs
}