import { useEffect, useState } from "react"
import { getCurrentUserInfo, isFollowing as checkFollow, followPlaylist, unfollowPlaylist } from "../api/spotify";

const Display = ({ location: { state: data } }) => {
  const [isFollowing, setIsFollowing] = useState();

  const handleFollow = () => {
    followPlaylist(data.id);
    setIsFollowing(true);
  }

  const handleUnfollow = () => {
    unfollowPlaylist(data.id);
    setIsFollowing(false);
  }

  useEffect(() => {
    if(data.type === "playlist"){
      getCurrentUserInfo().then((info) => {
        checkFollow(info.id, data.id).then((following) => {
          setIsFollowing(following[0])
        })
      });
    }
  }, [data]);
  
  return (
    <>
      <div className="display-info">
        <img width={300} src={data.images[0].url} alt={`${data.id}_image`} />
        <div>
          {data.label && <p><b>Label: </b>{data.label}</p>}
          <p><b>Name: </b>{data.name}</p>
          {data.description && <p><b>Description: </b>{data.description}</p>}
          {data.popularity && <p><b>Popularity: </b>{data.popularity}</p>}
          {data.release_date && <p><b>Release Date: </b>{data.release_date}</p>}
          <p><b>Total Tracks: </b>{data.tracks.total}</p>
          <p><b>{`${data.type.charAt(0).toUpperCase() + data.type.slice(1)} Link:`} </b><a href={data.external_urls.spotify}>{data.external_urls.spotify}</a></p>
        </div>
      </div>
      <div>
        {isFollowing ?
          <button onClick={handleUnfollow}>Unfollow</button>
          :
          <button onClick={handleFollow}>Follow</button>
        }
        

      </div>
      <div className="album-tracks" >
      <p>Tracks List:</p>
        {data.tracks.items && data.tracks.items.map((track) => (
            <div className="album-track" key={track.id}>
              <p>{track.name}</p>
              <iframe height={75} width={200} src={track.preview_url} title={track.id}/>
            </div>
        ))}
        </div>
    </>
  )
}

export default Display
