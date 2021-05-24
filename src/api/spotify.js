
const endpoint = process.env.REACT_APP_ENDPOINT;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-follow-read",
  "user-follow-modify",
  "playlist-modify-public",
  "playlist-modify-private"
];

export const loginUrl = `${endpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}`;

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": 'Bearer ' + localStorage.getItem("access_token")
}

const methods = {
  get: {
    method: "GET",
    headers
  },
  put: {
    method: "PUT",
    headers
  },
  delete: {
    method: "DELETE",
    headers
  }
}

export const getToken = (code) => {

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": 'Basic ' + btoa(clientId + ":" + clientSecret)
    },
    body: new URLSearchParams({
      code: code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri
    })
  });
}

export const getCurrentUserInfo = async () => {
  return fetch("https://api.spotify.com/v1/me", methods.get).then((data) => {
    return data.json()
  });
}

export const getCurrentUserAlbums = async () => {
  return fetch("https://api.spotify.com/v1/me/albums?market=PT", methods.get).then((data) => {
    return data.json()
  });
}

export const getAlbum = async (album_id) => {
  return fetch(`https://api.spotify.com/v1/albums/${album_id}?market=PT`, methods.get).then((data) => {
    return data.json()
  });
}

export const getArtistAlbums = async (artist_id) => {
  return fetch(`https://api.spotify.com/v1/artists/${artist_id}/albums?market=PT`, methods.get).then((data) => {
    return data.json()
  });
}

export const getCurrentUserPlaylists = async () => {
  return fetch("https://api.spotify.com/v1/me/playlists?market=PT", methods.get).then((data) => {
    return data.json()
  });
}

export const getPlaylist = async (playlist_id) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}?market=PT`, methods.get).then((data) => {
    return data.json()
  });
}

export const getCurrentUserArtists = async () => {
  return fetch("https://api.spotify.com/v1/me/following?type=artist&limit=20&market=PT", methods.get).then((data) => {
    return data.json()
  });
}

export const getFeaturePlaylists = async () => {
  return fetch("https://api.spotify.com/v1/browse/featured-playlists?market=PT", methods.get).then((data) => {
    return data.json()
  });
}

export const getNewReleases = async () => {
  return fetch("https://api.spotify.com/v1/browse/new-releases?limit=20&market=PT", methods.get).then((data) => {
    return data.json()
  });
}

export const getArtistTopTracks = async (id) => {
  return fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=PT`, methods.get).then((data) => {
    return data.json()
  });
}

export const searchPlaylist = async (q) => {
  return fetch(`https://api.spotify.com/v1/search?q=${q}&type=playlist,album,artist`, methods.get).then((data) => {
    return data.json()
  });
}

export const followPlaylist = async (playlist_id) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/followers`, methods.put);
}

export const unfollowPlaylist = async (playlist_id) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/followers`, methods.delete);
}

export const isFollowingPlaylist = async (user_id, playlist_id) => {
  return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/followers/contains?ids=${user_id}`, methods.get).then((data) => {
    return data.json()
  });
}

export const followArtist = async (artist_id) => {
  return fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${artist_id}`, methods.put);
}

export const unfollowArtist = async (artist_id) => {
  return fetch(`https://api.spotify.com/v1/me/following?type=artist&ids=${artist_id}`, methods.delete);
}

export const isFollowingArtist = async (artist_id) => {
  return fetch(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artist_id}`, methods.get).then((data) => {
    return data.json()
  });
}
