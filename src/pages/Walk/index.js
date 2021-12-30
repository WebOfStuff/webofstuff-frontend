
import React from 'react';
import VideoArea from '../../components/Video/index';
import { useLazyQuery, gql } from "@apollo/client";

const QUERY = gql`
  query {  
    contents {
      title
    }
  }
`;


export default function Walk() {
  const [
    getData,
    { loading, data }
  ] = useLazyQuery(QUERY);

  if (loading) return <p>Loading ...</p>;
  if (data && data.countries) {
    console.log(data.countries);
  }

  if (typeof window !== 'undefined') {
    document.addEventListener('click', function (e) {
      if (e.target && e.target.className === 'vjs-playlist-item-add') {
        getData();
      }
    }
    )
  }

  return (
    <VideoArea enableThemeQueryParam hideDescription />
  )
};
