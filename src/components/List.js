import { Link } from "react-router-dom";

const List = ({data = [], title}) => {

    if(data.length === 0){
        return null;
    }
    return(
        <>
            <p>{title}</p>
            <div className="user-albums">
                {data.map((object) => {
                    let item = "album" in object ? object.album : object;
                    return (
                        <Link to={{pathname: "/album", state:item}} id={item.id} key={item.id} >
                            <img width="300" src={item.images[0].url} alt={`${item.id}_image`} />
                            <div>{item.label}</div>
                        </Link>
                        )
                })}
            </div>
        </>
    )
}


export default List;