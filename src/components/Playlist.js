import { useEffect, useState } from "react"
import { getCurrentUserInfo, getPlaylist, isFollowingPlaylist as checkFollow, followPlaylist, unfollowPlaylist } from "../api/spotify";
import TracksList from "./TracksList"

const Playlist = ({ location: { state: data } }) => {
  const [isFollowing, setIsFollowing] = useState();
  const [playlist, setPlaylist] = useState(data);
  const [tracks, setTracks] = useState();

  const handleFollow = () => {
    followPlaylist(data.id);
    setIsFollowing(true);
  }

  const handleUnfollow = () => {
    unfollowPlaylist(data.id);
    setIsFollowing(false);
  }

  useEffect(() => {
    getPlaylist(data.id).then((playlist_data) => {console.log(playlist_data);setPlaylist(playlist_data)})

    getCurrentUserInfo().then((info) => {
      checkFollow(info.id, data.id).then((following) => {
        setIsFollowing(following[0])
      })
    });

  }, [data]);

  useEffect(() => {
    const tracks_data = playlist.tracks.items && playlist.tracks.items.map(({track}) => {
        return track;
    });

    if(tracks_data) setTracks(tracks_data)
  }, [playlist]);
  
  return (
    <>
      <div className="display-info">
        <img width={300} src={playlist.images[0].url} alt={`${playlist.id}_image`} />
        <div>
          <p><b>Name: </b>{playlist.name}</p>
          <p><b>Description: </b>{playlist.description}</p>
          <p><b>Followers: </b>{playlist.followers && playlist.followers.total}</p>
          <p><b>Total Tracks: </b>{playlist.tracks ? playlist.tracks.total : playlist.total_tracks}</p>
          <p><b>Owner: </b>{playlist.owner.display_name}</p>
          <p><b>Public: </b>{JSON.stringify(playlist.public)}</p>
          <p><b>{`${playlist.type.charAt(0).toUpperCase() + playlist.type.slice(1)} Link:`} </b><a href={playlist.external_urls.spotify}>{playlist.external_urls.spotify}</a></p>
        </div>
      </div>
      <div>
        {playlist.type === "playlist" && (isFollowing ?
          <button onClick={handleUnfollow}>Unfollow</button>
          :
          <button onClick={handleFollow}>Follow</button>)
        }
      </div>
      <TracksList tracks={tracks && tracks}/>

    </>
  )
}

export default Playlist
