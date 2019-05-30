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

async function _getUserPlaylists(playlists, options, onFetchUpdate, onFetchError) {
    try {
        const playlistsResponse = await spotifyApi.getUserPlaylists(options);
        playlistsResponse.items.map(playlistObject => 
            playlists.push({id: playlistObject.id, playlistName: playlistObject.name})
        );
        options.offset += playlistsResponse.limit;
        let offset = options.offset;
        const total = playlistsResponse.total;
        if(offset < total) {
            _getUserPlaylists(playlists, options, onFetchUpdate, onFetchError);
        } else {
            offset = total;
        }
        onFetchUpdate(playlists, offset, total);
    }
    catch(err) {
        console.error('Error: Attempting to get user playlists', err);
        console.error(err.stack);
        onFetchError();
        return;
    }
}

export function getUserPlaylists(onFetchUpdate, onFetchError) {
    let options = { limit: 50, offset: 0 }
    let playlists = [];
    _getUserPlaylists(playlists, options, onFetchUpdate, onFetchError);
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