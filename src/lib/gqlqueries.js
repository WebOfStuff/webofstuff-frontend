import {gql} from "apollo-server-micro";

export function getRecommendationQuery() {
  const  recommendationQuery = gql`
  query getRecommendation{  
    contents {
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