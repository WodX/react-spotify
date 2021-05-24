import { Link } from "react-router-dom";

const List = ({data = [], title, route="album"}) => {

    if(data.length === 0){
        return null;
    }
    return(
        <>
            <p>{title}</p>
            <div className="list">
                {data.map((object) => {
                    let item = "album" in object ? object.album : object;
                    return (
                        <Link to={{pathname: `/${route}`, state:item}} id={item.id} key={item.id} >
                            <img width="300" height="300" src={item.images[0] ? item.images[0].url: "https://emtechmena.com/wp-content/uploads/2018/07/default-avatar.png"} alt={`${item.id}_image`} />
                        </Link>
                        )
                })}
            </div>
        </>
    )
}


export default List;