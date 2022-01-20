import { gql } from "apollo-server-micro";

export function getRecommendationQuery() {
  const recommendationQuery = gql`
  query getRecommendation{  
    contents {
      id
      title
    }
  }
`;
  return recommendationQuery;
}

export function getListQuery() {
  const listQuery = gql`
  query getPlaylist($where: PlaylistWhere, $sort: [PlaylistContentsConnectionSort!]) {  
    playlists(where: $where) {
      name
      editmode
      contents {
        title
        youtubeid
      }
      contentsConnection(sort: $sort) {
        edges {
          position
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
  `;

  return listQuery;
}

export function getAddQuery() {
  const addQuery = gql`
  mutation Mutation($where: PlaylistWhere, $update: PlaylistUpdateInput, $connect: PlaylistConnectInput) {
    updatePlaylists(where: $where, update: $update, connect: $connect) {
      playlists {
        contentsAggregate {
          count
        }
      }
    }
  }
  `
  return addQuery;
}
export function getAddVariables(playlistName, position, id) {
  const addVariables =
  {
    "where": {
      "name": playlistName
    },
    "update": {
      "contents": [
        {
          "where": {
            "edge": {
              "position_LT": position
            }
          },
          "update": {
            "edge": {
              "position": position + 1
            }
          }
        }
      ]
    },
    "connect": {
      "contents": [
        {
          "where": {
            "node": {
              "id": id
            }
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




export function getDeleteQuery() {
  const deleteQuery = gql`
 
  `
  return deleteQuery;
}