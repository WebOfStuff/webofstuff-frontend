import React from 'react';
import { addQuery, getAddVariables } from '../../lib/gqlqueries';
import { useMutation, useQuery } from 'graphql-hooks'
import Icon from '../Base/Icon';
import { usePlaylistSetters, usePlaylistValues } from './PlaylistContext';
import { useSession } from "next-auth/react";
import { usePersonas } from '../Personas/PersonaContext';
import Table from '../Base/Table';

export default function Recommendations(props) {
  const { playlistName, playlistData, focusPosition } = usePlaylistValues();
  const { setFocusPosition } = usePlaylistSetters();
  const { data: session, status } = useSession();
  const { personas, setPersonas } = usePersonas();
  let { recommData, shownRowLimit } = props
  const [sendAdd, { data: addData, loading: addLoading, error: addError }] = useMutation(addQuery);
  let recommendationTable;
  let fields = ["icon_Add", "name", "label"]
  let clickFunctions = [addItem, null, null]
  let clickParameterSets = [{
    userId: session?.user?.id,
    personaId: personas[session?.user.currentPersona]?.id,
    personaName: personas[session?.user.currentPersona]?.name
  }, null, null]

  if (recommData !== undefined) {
    recommData.contents = playlistData.length > 0 ? recommData.recomm : recommData.recommFirst
    recommendationTable = <Table data={recommData} dataType="contents" clickFunctions={clickFunctions} clickParameterSets={clickParameterSets} fields={fields} tableId="Recommendations" />
  } else {
    recommendationTable =
      <table>
        <tbody>
          <tr>
            <th>1</th>
            <td>No results.</td>
          </tr>
        </tbody>
      </table>
  }

  return (
    <>
      {recommendationTable}
    </>
  )

  function addItem(e, props) {

    let { userId, personaId, personaName } = props
    let itemId = e?.row?.id;
    let addVariables = getAddVariables(playlistName, parseInt(focusPosition), itemId, userId, personaId, personaName);
    sendAdd({ variables: addVariables })
    //TODO: should do +1 needs to be limited to success
    setFocusPosition(Math.min(focusPosition + 1, playlistData.length))
  }
}

