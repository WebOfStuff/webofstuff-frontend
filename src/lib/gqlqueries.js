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
            id
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
      "personaName": personaName,
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

export const recomm = `#graphql
  query getRecommendation ($personaId: String, $previousContentId: String, $followingContentId: String){ 
    recomm (personaId: $personaId,previousContentId: $previousContentId, followingContentId: $followingContentId) {
      label
      name
      id
      algorithm
    }
  }
`
export const recommFirst = `#graphql
  query getFirstRecommendation ($personaId: String){ 
    recommFirst(personaId: $personaId) {
      label
      name 
      id
      algorithm
    }
  }
`

export function getRecommVariables(personaId, playlistName, playlistData, position, previousContentId, followingContentId) {
  const recommVariables = {
    "personaId": personaId,
    "playlistName": playlistName,
    "playlistPosition": position,
    "previousContentId": previousContentId,
    "followingContentId": followingContentId,
    "sort": [{ "edge": { "position": "ASC" } }],
  }
  return recommVariables
};


export const criteriaQuery = `#graphql
  query getCriteria{  
    contents {
      [id]
      [name]
    }
  }
`

export function getCriteriaVariables(playlistName) {
  const criteriaVariables = {};
  return criteriaVariables
};


export const addQuery = `#graphql
  mutation addContentToPlaylist($user: String!, $personaId: String!, $personaName: String!,  $playlistName: String!, $position: Int!, $itemId: String!) {
    mergePersonaAndPlaylistAndSetAsCurrent(user: $user, personaId: $personaId, personaName: $personaName,  playlistName: $playlistName ) {
      name: name
    }
    uptickPlaylistStartingAtPosition(playlistName: $playlistName, position: $position) {
      name: name
    }
    addContentToPlaylist(itemId: $itemId, playlistName: $playlistName,position: $position) {
      name: name
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
    "itemId": itemId
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


export const importYtPlaylist = `#graphql
mutation importYtPlaylist($playlistName: String!, $playlistItems: [PlaylistItem]!) {
  importYtPlaylist(playlistName: $playlistName, playlistItems: $playlistItems) {
    name
  }
}
`

export function getImportVariables(playlistName, playlistItems) {
  const importVariables =
  {
    "playlistName": playlistName,
    "playlistItems" : playlistItems
  }
  return importVariables;
}