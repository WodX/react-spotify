
const TracksList = ({tracks}) => {

    if(!tracks || tracks.length === 0 ) {
        return null;
    }
    return(
        <div className="tracks">
            <div className="tracks-list">
                <p></p>
                <p><b>Title</b></p>
                <p><b>Album</b></p>
                <p><b>Preview</b></p>
            </div>
            {tracks && tracks.map((track) => {
                return (
                    <div className="tracks-list" key={track.id}>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <img width={50} height={50} src={track.album && track.album.images[0] ? track.album.images[0].url: "https://emtechmena.com/wp-content/uploads/2018/07/default-avatar.png"} alt={`${track.id}_image`} />
                            <p>{track.name}</p>
                        </div>
                        <p>{track.album.name}</p>
                        <p><a href={track.preview_url} target="_BLANK" rel="noreferrer" style={{textDecoration: "none", textUnderlineOffset: "none", color: "white", fontSize: "20px"}}>▶</a></p>
                    </div>
                )
            })}
        </div>
    )
}


export default TracksList;