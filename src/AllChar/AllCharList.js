import React, { useState } from 'react';
import { add, add_for_tier } from '../FavChar/listSlice';
import { useFetchCharacterByIdQuery, useFetchCharactersQuery } from './apiSlice';
import { useDispatch, useSelector} from 'react-redux';
import Navbar from '../NavBar/NavBar';

function AllCharList() {
  const charlist=useSelector((state) => state.list.chars)
  const tierlist=useSelector((state) => state.list.charsForTierList)
  const [page, setPage] = useState(1); // State to keep track of the current page
  const { data, error, isLoading } = useFetchCharactersQuery(page);
  const dispatch = useDispatch();

  // Loading and error states
  if (isLoading) return <div>Loading characters...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Add a character to the list
  async function Add_handler(charId) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${charId}`);
      const character = await response.json();

      // Dispatch the character to the Redux store
      const parsed_character={id:character.id, 
                              name:character.name,
                              image:character.image}

      dispatch(add(parsed_character));
    } catch (err) {
      console.error('Failed to fetch character:', err);
    }
  }

  async function Add_for_tier_handler(charId) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${charId}`);
      const character = await response.json();

      // Dispatch the character to the Redux store
      const parsed_character={id:character.id, 
                              image:character.image}

      dispatch(add_for_tier(parsed_character));
    } catch (err) {
      console.error('Failed to fetch character:', err);
    }
  }
  
  function decide_dispatch(id){
    if((charlist.filter((obj)=> obj.id == id)).length === 0){
      Add_handler(id)
    }else{
    }
  }

  // Render characters
  return (
    <>
      <Navbar/>
      <div>
        <h1>Rick and Morty Characters</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {data.results.map((character) => (
            <div key={character.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
              <img
                src={character.image}
                alt={character.name}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
              />
              <h3>{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              {/* buttons with conditional inner text */}
              <button className='allchars-add-button' onClick={()=>decide_dispatch(character.id)}> {(charlist.filter((obj)=> obj.id == character.id)).length === 0 ? "🤍" : "🧡" } </button>
              <button className='allchars-add-for-tier-button' onClick={()=>Add_for_tier_handler(character.id)}>{(tierlist.filter((obj)=> obj.id == character.id)).length === 0 ? "☰" : "✔"} </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            disabled={!data.info.prev} // Disable button if no previous page
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer' }}
          >
            Previous
          </button>
          <button
            disabled={!data.info.next} // Disable button if no next page
            onClick={() => setPage((prev) => prev + 1)}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AllCharList;