





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

export function getListVariables(playlistName){
  const listVariables ={ "where": { "name": playlistName }, "sort": [{ "edge": { "position": "ASC" } }] };
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

export function getRecommVariables(playlistName){
  const listVariables ={ };
return listVariables
};

export const addQuery =  `#graphql
  mutation addContentToPlaylist($where: PlaylistWhere, $connect: PlaylistConnectInput, $sort: [PlaylistContentsConnectionSort!], $playlistName: String!, $position: Int!) {
    updatePlaylists(where: $where, connect: $connect) {
      playlists {
        contentsConnection (sort: $sort) {
          edges {
            position
            node {
              title
              youtubeid
            }
          }
        }
      }
    }
    downtickHigherPositions(playlistName: $playlistName, position: $position) {
      name
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
            "node": {
              "id": id
            }
          },
          "connect": [
            {
              "playlists": [
                {
                  "where": {
                    "node": {
                      "name": playlistName
                    }
                  }
                }
              ]
            }
          ],
          "edge": {
            "position": position
          }
        }
      ]
    },  
    "sort": [{ 
      "edge": { 
        "position": "ASC" 
      } 
    }] 
  }
  return addVariables;
}

export const deleteQuery = `#graphql
  mutation deleteContentfromPlaylist($position: Int!, $playlistName: String!, $where: PlaylistWhere, $disconnect: PlaylistDisconnectInput, $sort: [PlaylistContentsConnectionSort!]) {
    updatePlaylists(where: $where, disconnect: $disconnect) {
      playlists {
        contentsConnection (sort: $sort) {
          edges {
            position
            node {
              title
              youtubeid
            }
          }
        }
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
    "sort": [{ 
      "edge": { 
        "position": "ASC" 
      } 
    }] 
  }
  return deleteVariables;
}

