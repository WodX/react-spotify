import '../App.css';
import { loginUrl } from "../api/spotify";

const Home = () => {
    return(
        <a className="login-button" href={loginUrl}>Login with Spotify</a>
      )
  }


export default Home;