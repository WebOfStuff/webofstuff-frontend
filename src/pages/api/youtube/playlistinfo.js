
import { google } from 'googleapis';

let googleAuth;

export default async function playlistinfo (req, res) {
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
  let playlistinfo = await youtube.playlists.list({
    id: req.body.playlistId,
    part: 'snippet'
  });

  return res.status(200).json({ playlistinfo });
};

