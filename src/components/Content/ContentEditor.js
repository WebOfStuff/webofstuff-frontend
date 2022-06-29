
export default function ContentEditor(props) {
  const { viewMode, editMode, contentName, contentData} = usePlaylistValues();
  const { setViewMode, setEditMode,setContentName, setContentData} = usePlaylistSetters();
  // use Session if it exists
  const { data: session, status } = useSession();


  const { loading: listLoading, error: listError, data: listData, refetch: listRefetch } = useQuery(getContent, {
    skip: contentName == null,
    variables: getContentVariables(contentName),
  });

}
