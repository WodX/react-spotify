import { useEffect, useState } from "react"
import { isFollowingArtist as checkFollow, followArtist, unfollowArtist, getArtistTopTracks, getArtistAlbums } from "../api/spotify";
import TracksList from "./TracksList";
import { Link } from "react-router-dom";

const Artist = ({ location: { state: data } }) => {
  const [isFollowing, setIsFollowing] = useState();
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isAlbums, setIsAlbums] = useState(false);

  const handleFollow = () => {
    followArtist(data.id);
    setIsFollowing(true);
  }

  const handleUnfollow = () => {
    unfollowArtist(data.id);
    setIsFollowing(false);
  }

  useEffect(() => {
    getArtistTopTracks(data.id).then(({tracks : tracksData}) => {
      setTracks(tracksData);
    })

    checkFollow(data.id).then((following) => {
      setIsFollowing(following[0])
    })

    getArtistAlbums(data.id).then(({items}) => {
      setAlbums(items);
    })

  }, [data]);
  
  return (
    <>
      <div className="display-info">
        <img width={300} src={data.images[0] ? data.images[0].url: "https://emtechmena.com/wp-content/uploads/2018/07/default-avatar.png"} alt={`${data.id}_image`} />
        <div>
          <p><b>Name: </b>{data.name}</p>
          <p><b>Popularity: </b>{data.popularity}</p>
          <p><b>Followers: </b>{data.followers.total}</p>
          <p><b>Genres: </b>{data.genres.join(", ")}</p>
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
      <br/>
      <button onClick={() => {setIsAlbums(!isAlbums)}}>{isAlbums ? "Top Tracks" : "Albums"}</button><br/>
      {isAlbums ?
        (
          <>
            <p>Artist Albums</p>
            <div className="albums-list">
              <div className="albums-list-item" >
                <p></p>
                <p><b>Name</b></p>
                <p><b>Tracks</b></p>
                <p><b>Release Date</b></p>
              </div>
              {albums.map((object) => {
                let item = "album" in object ? object.album : object;
                return (
                    <Link to={{pathname: `/album`, state:item}} id={item.id} key={item.id} className="albums-list-item" >
                        <img width="50" height="50" src={item.images[0] ? item.images[0].url: "https://emtechmena.com/wp-content/uploads/2018/07/default-avatar.png"} alt={`${item.id}_image`} />
                        <p>{item.name}</p>
                        <p>{item.total_tracks}</p>
                        <p>{item.release_date}</p>
                    </Link>
                    )
              })}
            </div>
          </>
        ) : (
          <>
            <p>Top 10 Artist Tracks</p>
            <TracksList tracks={tracks}/>
          </>
        )
      }
    </>
  )
}

export default Artist
