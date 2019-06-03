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

const _request = {
    'user playlists': spotifyApi.getUserPlaylists,
    'playlist tracks': spotifyApi.getPlaylistTracks
};

async function _getListOfItems(listType, id, list, itemMapper, options, onFetchUpdate, onFetchError) {
    try {
        const response = !id ? await _request[listType](options) : await _request[listType](id, options); 
        response.items.map(itemMapper(list));
        options.offset += response.limit;
        let offset = options.offset;
        const total = response.total;
        if(offset < total) {
            _getListOfItems(listType, id, list, itemMapper, options, onFetchUpdate, onFetchError);
        } else {
            offset = total;
        }
        onFetchUpdate(list, offset, total);
    }
    catch(err) {
        console.error(`Error: Attempting to get ${listType}`, err);
        console.error(err.stack);
        onFetchError();
        return;
    }
}

export async function getUserPlaylists(onFetchUpdate, onFetchError) {
    let playlists = [];
    const playlistsMapper = (list) => {
        return (obj) => list.push({
            id: obj.id,
            playlistName: obj.name,
            url: obj.external_urls.spotify
        })
    };
    let options = { limit: 50, offset: 0 };
    await _getListOfItems('user playlists', null, playlists, playlistsMapper, options, onFetchUpdate, onFetchError);
}

export async function getPlaylistTracks(playlistId, onFetchUpdate, onFetchError) {
    let tracks = [];
    const tracksMapper = (list) => {
        return (obj) => list.push({
            id: obj.track.id,
            title: obj.track.name,
            artists: obj.track.artists.map(artist => artist.name)
        })
    };
    let options = { limit: 50, offset: 0};
    await _getListOfItems('playlist tracks', playlistId, tracks, tracksMapper, options, onFetchUpdate, onFetchError);
}