import { Link } from "react-router-dom";
import './HomePage.css'; // Ensure this CSS file is imported

function HomePage() {
    return (
        <div className="homepage-container">
            
            <video 
                className="video-background" 
                src="/back.mp4" 
                autoPlay 
                loop 
                muted>
            </video>
            <div className="homepage-content">
                <ul>
                    <li>
                        <h1><Link to="/FavCharList" className="homepage-link">Click to enter</Link></h1>
                    </li>
                </ul>
            </div>
        </div>
    );
} 

export default HomePage;
