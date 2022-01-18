export function getPlaylistCookie(){
  var jsId =  document.cookie.match(/Playlist=[^;]+/);
  if(jsId != null) {
      if (jsId instanceof Array)
          jsId = jsId[0].substring(9);
      else
          jsId = jsId.substring(9);
  }
  return jsId;
}

export function createPlaylistCookie() {
  const sessionid = self.crypto.randomUUID();
  document.cookie = "Playlist=" + sessionid+";path=/";
};