
export const listQuery = `#graphql
  query getPlaylist($where: PlaylistWhere, $sort: [PlaylistContentsConnectionSort!]) {  
    playlists(where: $where) {
      name
      editmode
      contentsConnection (sort: $sort) {
        edges {
          position
          node {
            title
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
  const listVariables = { "where": { "name": playlistName }, "sort": [{ "edge": { "position": "ASC" } }] };
  return listVariables
};


export const recommQuery = `#graphql
  query getRecommendation{  
    contents {
      id
      title
    }
  }
`

export function getRecommVariables(playlistName) {
  const listVariables = {};
  return listVariables
};

export const addQuery = `#graphql
  mutation addContentToPlaylist($where: PlaylistWhere, $connect: PlaylistConnectInput, $playlistName: String!, $position: Int!) {
    uptickPlaylistStartingAtPosition(playlistName: $playlistName, position: $position) {
      name
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

export function getAddVariables(playlistName, position, id) {
  const addVariables =
  {
    "position": position,
    "playlistName": playlistName,
    "where": {
      "name": playlistName
    },
    "connect": {
      "contents": [
        {
          "where": {
            "node": { "id": id }
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
