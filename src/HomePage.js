import { Link } from "react-router-dom";
import Navbar from './NavBar/NavBar';

function HomePage(){
    return(
    <div className="homepage-container">
        <Navbar/>
        
        <ul>
            
            <li><h1><Link to="/FavCharList"> Click to enter </Link></h1></li>
        </ul>
        
    </div>);
}

export default HomePage;