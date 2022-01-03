
import React from 'react';
import VideoArea from '../components/Video/VideoArea';
import { useLazyQuery, gql } from "@apollo/client";
import { useSession } from "next-auth/react"

const QUERY = gql`
  query {  
    contents {
      title
    }
  }
`;


export default function Walk() {
  const [getData,{ loading, data }] = useLazyQuery(QUERY);
  const { data: session, status } = useSession();

  if (typeof window !== 'undefined') {
    document.addEventListener('click', function (e) {
      if (e.target && e.target.className === 'vjs-playlist-item-add') {
        getData();
      }
    }
    )
  }

  return (
    <VideoArea enableThemeQueryParam hideDescription session={session} status ={status} />
  )
};
