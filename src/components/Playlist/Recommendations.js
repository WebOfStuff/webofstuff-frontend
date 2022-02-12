import React from 'react';
import { recommQuery, getRecommVariables, addQuery, getAddVariables } from '../../lib/gqlqueries';
import { useMutation, useQuery } from 'graphql-hooks'
import Icon from '../Base/Icon';
import Box from '../Base/Box';
import { usePlaylistSetters, usePlaylistValues } from './PlaylistContext';
import { useSession } from "next-auth/react";
import { usePersona } from '../personas/PersonaContext';

export default function Recommendations(props) {

  let { recommData } = props
  const [sendAdd, { data: addData, loading: addLoading, error: addError }] = useMutation(addQuery);
  if (recommData !== undefined) {
    let contents = recommData.contents;
    let algorithm = "normal"
    let listItems;

    listItems = contents.map((item, index) =>
      <React.Fragment key= {item.id}>
        <RecommendationsRow  item={item} index={index} sendAdd={sendAdd} />
      </React.Fragment>
    );

  } else {
    listItems =
      <tr>
        <th>1</th>
        <td>No results.</td>
      </tr>
  }


  return (
    <>
      <Box>
        <div id="recomm" className="overflow-x-auto">
          <table id="recomm-item" algorithm={algorithm} className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Titel</th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </table>
        </div>
      </Box>
    </>

  )
}

function RecommendationsRow(props) {
  let { item, index } = props;
  const {sendAdd} = props;
  const { data: session, status } = useSession();
  const { state: persona, dispatch: setPersona } = usePersona();
  const { playlistData, playlistName, focusPosition } = usePlaylistValues();
  const { setFocusPosition } = usePlaylistSetters();
  return (
    <tr>
      <th>
        <a onClick={(event) => addItem(
          item.id,
          session?.user?.id,
          session?.user.userPersonas[persona]?.persona.id,
          session?.user.userPersonas[persona]?.persona.name
        )} className="">
          <Icon shape="add" circle={true} circleClass="success" strokeClass="neutral" className="h-[5vh] w-[5vh] z-20 relative left-1/4 stroke-current inline-block"></Icon>
        </a>
      </th>
      <td>{item.name}</td>
    </tr>)

  function addItem(itemId, userId, personaId, personaName) {

    let addVariables = getAddVariables(playlistName, parseInt(focusPosition), itemId, userId, personaId, personaName);
    sendAdd({ variables: addVariables })
    //TODO: should do +1 needs to be limited to success
    setFocusPosition(Math.min(focusPosition + 1, playlistData.length))
  }
}

