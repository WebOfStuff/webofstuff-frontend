
export default function getTypeDefs() {
  const typeDefs = `#graphql
  type Content {
    id: String! @unique
    name: String!
    youtubeid: String
    playlists: [Playlist!]! @relationship(type: "INCLUDED_IN", direction: OUT, properties: "PlaylistContents")
    labels: [Label!]! @relationship(type: "IS", direction: IN, properties: "ContentLabels")
    artists: [Artist!]! @relationship(type: "WORKED_ON", direction: IN, properties: "ArtistContents")
  }

  type Playlist {
    name: String! @unique
    editmode: String
    contents: [Content!]! @relationship(type: "INCLUDED_IN", direction: IN, properties: "PlaylistContents")
    personas: [Persona!]! @relationship(type: "CONNECTED_TO", direction: OUT, properties: "PlaylistPersonas")
  }


  type Persona {
    id: String! @unique
    name: String!
    playlists: [Playlist!]! @relationship(type: "CONNECTED_TO", direction: IN, properties: "PlaylistPersonas")
    users: [User!]! @relationship(type: "USES", direction: IN, properties: "UserPersonas")
  }


  type Recommendation {
    id: String! @unique
    name: String!
    label: String! 
    algorithm: String!
  }

  type User {
    id: String! @unique
    personas: [Persona!]! @relationship(type: "USES", direction: OUT, properties: "UserPersonas")
  }

  type Artist {
    name: String! @unique
    contents: [Content!]! @relationship(type: "WORKED_ON", direction: OUT, properties: "ArtistContents")
  }

  type Label {
    name: String! @unique
    contents: [Content!]! @relationship(type: "IS", direction: OUT, properties: "ContentLabels")
  }

  interface ContentLabels @relationshipProperties {
    votedUpBy: [String] 
    votedDownBy: [String]  
    percentage: String
  }

  interface PlaylistPersonas @relationshipProperties {
    role: String
  }

  interface ArtistContents @relationshipProperties {
    role: String
  }

  interface PlaylistContents @relationshipProperties {
    position: Int
    addedBy: String
  }

  interface UserPersonas @relationshipProperties {
    favorite: Boolean
  }

  type Mutation {
    addContentToPlaylist(itemId: String!, playlistName: String!, position: Int!): Playlist
         @cypher(
            statement: """
            MATCH (p:Playlist {name:$playlistName}),(c:Content  {id:$itemId})
            MERGE (c)-[r:INCLUDED_IN {position:$position}]->(p)
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
  type Mutation {
    mergePersonaAndPlaylistAndSetAsCurrent(personaId: String!, personaName: String!, user: String!, playlistName: String!): Playlist
        @cypher(
            statement: """
            merge (pe:Persona {id: $personaId, name: $personaName, user: $user})
            merge (plh:Playlist {name: 'helper'})
            with plh, pe
            merge ((plh)-[r:CONNECTED_TO]->(pe))
            with r, pe, plh
            merge (pl:Playlist {name: $playlistName})
            ON CREATE 
              SET r.role = 'owner'
            ON MATCH
              SET r.role  = 'editor'
            with pl, r, pe, plh
            merge ((pl)-[r2:CONNECTED_TO {role: r.role}]->(pe))
            with pl, r2, pe,plh
            DETACH DELETE plh
            with pl, r2, pe
            RETURN pl
            """
        )
  }

  input PlaylistItem{
  videoId: String!
  position: Int
  title: String!
  contentId: String!
}

  type Mutation {
    importYtPlaylist(playlistName: String!, playlistItems: [PlaylistItem]!): Label
        @cypher(
          statement: """
          UNWIND $playlistItems AS playlistItem
          MERGE (l:Label {name: $playlistName})
          MERGE (c:Content {youtubeid: playlistItem.videoId})
          ON CREATE
            SET c.id = playlistItem.contentId
            SET c.name = playlistItem.title
          MERGE (c)<-[r:IS]-(l)
          RETURN l
"""
        )
  }

  type Query {
    recomm (personaId: String, previousContentId: String, followingContentId: String): [Recommendation]
        @cypher(
          statement: """
    MATCH (c1:Content  {id:	$previousContentId})<-[r1:IS]-(l:Label)-[r2]->(c2:Content) 
    RETURN {label: l.name ,name: c2.name,id: c2.id, algorithm: 'Shared Label Prev'} as Recommendation 
    UNION ALL 
    MATCH (c2:Content  {id:	$followingContentId})<-[r1b:IS]-(lb:Label)-[r2b]->(c2b:Content) RETURN {label: lb.name ,name: c2b.name,id: c2b.id, algorithm: 'Shared Label Next'} as Recommendation
    RETURN Recommendation
 
"""
        )
  }

  type Query {
    recommFirst (personaId: String): [Recommendation]
        @cypher(
          statement: """
     MATCH (p:Persona  {id:	$personaId})-->(l:Label)-->(c:Content)
     RETURN {label: \\"Content\\" ,name: \\"bla2\\",id: \\"bla3\\", algorithm: \\"Close to Persona\\"} as Recommendation
     
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