import './CharDetail.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar'

function CharDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { char } = location.state; 

  useEffect(() => {
    if (!char) {
      navigate('/');
    }
  }, [char, navigate]);

  if (!char) {
    return null; 
  }

  const Text = styled.h3`
    margin: 0px 0;
    text-align:left;
    margin-top:10px;
    font-size: 1.4em;
    color: rgb(73, 73, 73);
  `;

  return (
    <>
      <NavBar></NavBar>
      <div className="char-detail">
        <div className='char-detail-main-info'>    
          <img src={char.image} alt={char.name} className="char-image" />
            <div className='char-detail-main-info-text'>
              <h1 className='char-detail-name'>{char.name}</h1>
              <Text>Status: {char.status}</Text>
              <Text>Species: {char.species}</Text>
              <Text>Type: {char.type || "Unknown"}</Text>
              <Text>Gender: {char.gender}</Text>
              <Text>Origin: {char.origin?.name}</Text>
              <Text>Location: {char.location?.name}</Text>
            </div>
        </div>
        <div className='char-episode-list-container'>
          <div>
            <Text>Episodes:</Text>
          </div>
          <ul className='char-episode-list'>
            {char.episode.map((episodeUrl, index) => (
              <li className='episode' key={index}>
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CharDetail;
