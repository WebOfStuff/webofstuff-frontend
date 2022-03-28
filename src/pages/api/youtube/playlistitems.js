
import { google } from 'googleapis';

let googleAuth;

export default async (req, res) => {
  debugger;
  googleAuth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    scopes: ['https://www.googleapis.com/auth/youtube.readonly']
  });
  const youtube = google.youtube({
    auth: googleAuth,
    version: 'v3',
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  });
  let nextPageToken = "";
  let playlistitems = [];
  while (nextPageToken != null) {
    let response = await youtube.playlistItems.list({
      playlistId: req.body.playlistId,
      part: 'snippet',
      pageToken: nextPageToken
    });
    nextPageToken = response.data.nextPageToken;
    playlistitems = playlistitems.concat(response.data.items)
  }
  return res.status(200).json({ playlistitems });
};




/**
  * Sample JavaScript code for youtube.playlistItems.list
  * See instructions for running APIs Explorer code samples locally:
  * https://developers.google.com/explorer-help/code-samples#javascript
  */
/* 
export function authenticate() {
  return GoogleApis.auth2.getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
    .then(function () { console.log("Sign-in successful"); },
      function (err) { console.error("Error signing in", err); });
}
export function loadClient() {
  GoogleApis.client.setApiKey(process.env.YOUTUBE_APIKEY);
  return GoogleApis.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () { console.log("GAPI client loaded for API"); },
      function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
export function execute(id) {
  return GoogleApis.client.youtube.playlistItems.list({
    "part": [
      "snippet,contentDetails"
    ],
    "maxResults": 25,
    "playlistId": id
  })
    .then(function (response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
      function (err) { console.error("Execute error", err); });
}
GoogleApis.load("client:auth2", function () {
  GoogleApis.auth2.init({ client_id: process.env.GOOGLE_ID });
}); */