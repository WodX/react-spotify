import { useEffect, useState } from "react"
import { getAlbum } from "../api/spotify";

const Album = ({ location: { state: data } }) => {
  const [album, setAlbum] = useState(data)

  useEffect(() => {
    getAlbum(data.id).then((album_data) => {setAlbum(album_data)});
  }, [data]);
  
  return (
    <>
      <div className="display-info">
        <img width={300} src={album.images[0].url} alt={`${album.id}_image`} />
        <div>
          {album.label && <p><b>Label: </b>{album.label}</p>}
          <p><b>Name: </b>{album.name}</p>
          {album.description && <p><b>Description: </b>{album.description}</p>}
          {album.popularity && <p><b>Popularity: </b>{album.popularity}</p>}
          {album.release_date && <p><b>Release Date: </b>{album.release_date}</p>}
          <p><b>Total Tracks: </b>{album.tracks ? album.tracks.total : album.total_tracks}</p>
          <p><b>{`${album.type.charAt(0).toUpperCase() + album.type.slice(1)} Link:`} </b><a href={album.external_urls.spotify}>{album.external_urls.spotify}</a></p>
        </div>
      </div>
      <div className="album-tracks">
        <p><b>Album Tracks List:</b></p>
        {
          album.tracks &&
          album.tracks.items.map((track) => (
            <div className="album-track" key={track.id}>
              <p>{track.track_number} - </p>  
              <p>{track.name}</p>
              <p><a href={track.preview_url} target="_BLANK" rel="noreferrer" style={{textDecoration: "none", textUnderlineOffset: "none", color: "white", fontSize: "20px"}}>▶</a></p>
            </div>
          ))}
      </div>
    </>
  )
}

export default Album
