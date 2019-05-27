import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify();

export function redirectUrlToSpotifyForLogin(){
    const CLIENT_ID = "66d3bab0942840bbafc35c603d66f78a";
    const REDIRECT_URI = "http://localhost:3000";
    const scopes = [
    "user-modify-playback-state",
    "user-library-read",
    "user-library-modify",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private"];
    return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
}

export function checkUrlForSpotifyAccessToken(){
    const params = getHashParams();
    const accessToken = params.access_token
    if (!accessToken) {
        return false
    }
    else {
        return accessToken
    }
}

function getHashParams() {
  //helper function to parse the query string that spotify sends back when you log in
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
      // eslint-disable-next-line
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

export function setAccessToken(accessToken) {
    //since using spotifyApi as helper library you can set the access code once
    //you get it and then not have to include it in every request
    spotifyApi.setAccessToken(accessToken);
}

export async function getUserPlaylists() {
    //returns an array of objects with playlist name (like "Favorite Smashing Pumpkins jamz")
    //and the id of the playlist. Use this to feed the playlists selection list
    try {
        const playlistsResponse = await spotifyApi.getUserPlaylists();
        //playlistsResponse.items are the actual playlist objects
        const playlists = playlistsResponse.items.map((playlistObject) => {
            const {id, name} = playlistObject;
            return {id: id, playlistName: name}
        })
        return playlists
    }
    catch(err) {
        //return default array with note that can't download playlists
        console.error('Error: Attempting to get user playlists', err);
        console.error(err.stack);
        return null
    }
}

export async function getPlaylistTracks(playlistId) {
    try {
        const playlistTracksResponse = await spotifyApi.getPlaylistTracks(playlistId);
        return playlistTracksResponse.items.map(trackObject => {
            return {
                title: trackObject.track.name,
                artists: trackObject.track.artists.map(artist => artist.name)
            }
        });

    }
    catch(err) {
        console.error('Error: Attempting to get playlist tracks', err);
        console.error(err.stack);
        return null
    }
}