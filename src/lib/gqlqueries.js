export const getPlaylist = `#graphql
query getPlaylist($where: PlaylistWhere, $sort: [PlaylistContentsConnectionSort!]) {
    playlists(where: $where) {
      name
      editmode
      contentsConnection (sort: $sort) {
        edges {
          position
          node {
            name
            youtubeid
          }
        }
      }
      personas {
        name
      }
      personasConnection {
        edges {
          role
        }
      }
    }
  }
`

export function getListVariables(playlistName) {
  const listVariables = {
    "where": { "name": playlistName },
    "sort": [{ "edge": { "position": "ASC" } }],
  }
  return listVariables
};

export const createPlaylistAndPersonaAndLinkThemQuery = `#graphql
mutation CreatePersonas(input: $input){
  createPersonas{
    id
    name
    user
    playlists() {
      name
    }
  }
}
`

/* export function getCreatePlaylistAndPersonaAndLinkThemVariables(playlistName, personaId, personaName, personaUser, personaPlaylistRole) {
  const createPlaylistAndPersonaAndLinkThemVariables = { 
 "input": [{
      "id": personaId,
      "name": personaName,
      "user": personaUser,
      "playlists": {
        "create": [
          {
            "node": {
              "name": playlistName,
              "id": playlistId
            },
            "edge": {
              "role": personaPlaylistRole
            }
          }
        ]
      }
    }]
  };
  return createPlaylistAndPersonaAndLinkThemVariables;
} */

export const recommQuery = `#graphql
  query getRecommendation{  
    contents {
      id
      name
    }
  }
`

export function getRecommVariables(playlistName) {
  const listVariables = {};
  return listVariables
};

export const addQuery = `#graphql
  mutation addContentToPlaylist($user: String!, $personaId: String!, $personaName: String!,  $playlistName: String!, $position: Int!, $where: PlaylistWhere, $connect: PlaylistConnectInput) {
    mergePersonaAndPlaylistAndSetAsCurrent(user: $user, personaId: $personaId, personaName: $personaName,  playlistName: $playlistName ) {
      name: name
    }
    uptickPlaylistStartingAtPosition(playlistName: $playlistName, position: $position) {
      name: name
    }
    updatePlaylists(where: $where, connect: $connect) {
      info {
        relationshipsCreated
        relationshipsDeleted
        nodesDeleted
        nodesCreated
        bookmark
      }
    }
   }
  `

export function getAddVariables(playlistName, position, itemId, userId, personaId, personaName) {
  const addVariables =
  {
    "personaName": personaName,
    "personaId": personaId,
    "position": position,
    "user": userId,
    "playlistName": playlistName,
    "where": {
      "name": playlistName
    },
    "connect": {
      "contents": [
        {
          "where": {
            "node": { "id": itemId }
          },
          "edge": {
            "position": position
          }
        }
      ]
    }
  }
  return addVariables;
}

export const deleteQuery = `#graphql
  mutation deleteContentfromPlaylist($position: Int!, $playlistName: String!, $where: PlaylistWhere, $disconnect: PlaylistDisconnectInput) {
    updatePlaylists(where: $where, disconnect: $disconnect) {
      info {
        relationshipsCreated
        relationshipsDeleted
        nodesDeleted
        nodesCreated
        bookmark
      }
    }
    downtickHigherPositions(position: $position, playlistName: $playlistName) {
      name
    }
  }
  `


export function getDeleteVariables(playlistName, position) {
  const deleteVariables =
  {
    "position": position,
    "playlistName": playlistName,
    "where": {
      "name": playlistName
    },
    "disconnect": {
      "contents": [{
        "where": {
          "edge": {
            "position": position
          }
        }
      }]
    },
  }
  return deleteVariables;
}

export const saveQuery = `#graphql
  mutation savePlaylist($where: PlaylistWhere) {
    updatePlaylists(where: $where) {
      info {
        relationshipsCreated
        relationshipsDeleted
        nodesDeleted
        nodesCreated
        bookmark
      }
    }
  }
  `

export function saveVariables(playlistName) {
  const saveVariables =
  {
    "playlistName": playlistName,
    "where": {
      "name": playlistName
    }
  }
  return saveVariables;
}
