import React, { useState, useEffect } from 'react';
import './AllCharList.css';
import { add, add_for_tier } from '../FavChar/listSlice';
import { useFetchCharacterByIdQuery, useFetchCharactersQuery } from './apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

function AllCharList() {
  const charlist = useSelector((state) => state.list.chars) || [];
  const tierlist = useSelector((state) => state.list?.charsForTierList || []);
  const [page, setPage] = useState(1); // State to keep track of the current page
  const [filterText, setFilterText] = useState(''); // State for filter text
  const [filteredData, setFilteredData] = useState([]); // State for filtered characters
  const dispatch = useDispatch();

  const { data, error, isLoading } = useFetchCharactersQuery(page);

  // Fetch and apply the filter
  useEffect(() => {
    const fetchFilteredData = async () => {
      if (filterText.trim() === '') {
        setFilteredData(data?.results || []);
      } else {
        const allCharacters = [];
        let currentPage = 1;
        let hasNextPage = true;

        // Fetch all pages until all characters matching the filter are loaded
        while (hasNextPage) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?page=${currentPage}`
          );
          const result = await response.json();

          const matchingCharacters = result.results.filter((character) =>
            character.name.toLowerCase().includes(filterText.toLowerCase())
          );

          allCharacters.push(...matchingCharacters);

          // Stop if no more pages
          hasNextPage = result.info?.next;
          currentPage++;
        }

        setFilteredData(allCharacters);
      }
    };

    if (data) fetchFilteredData();
  }, [filterText, data]);

  // Loading and error states
  if (isLoading) return <div>Loading characters...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Add a character to the list
  async function Add_handler(charId) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${charId}`);
      const character = await response.json();

      // Dispatch the character to the Redux store
      const parsed_character = { id: character.id, name: character.name, image: character.image };

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
      const parsed_character = { id: character.id, image: character.image };

      dispatch(add_for_tier(parsed_character));
    } catch (err) {
      console.error('Failed to fetch character:', err);
    }
  }

  function decide_dispatch(id) {
    if (charlist.filter((obj) => obj.id === id).length === 0) {
      Add_handler(id);
    }
  }

  // Render characters
  return (
    <>
      <Navbar />
      <div className="all-char-container">
        <h1 className="all-char-title">Rick and Morty Characters</h1>

        {/* Filter Input */}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Filter characters by name..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '16px',
            }}
          />
        </div>

        <div
          className="all-char-card-container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}
        >
          {filteredData.map((character) => (
            <div className="all-char-card" key={character.id}>
              <Link to={'/CharDetail'} state={{ char: character }}>
                <img
                  src={character.image}
                  alt={character.name}
                  style={{ width: '180px', borderRadius: '8px', marginBottom: '10px' }}
                />
              </Link>
              <h3 className="all-char-char-name">{character.name}</h3>
              <div className="char-add-buttons-container">
                <button
                  className="allchars-add-button"
                  onClick={() => decide_dispatch(character.id)}
                >
                  {charlist.filter((obj) => obj.id === character.id).length === 0 ? '🤍' : '🧡'}
                </button>
                <button
                  className="allchars-add-for-tier-button"
                  onClick={() => Add_for_tier_handler(character.id)}
                >
                  {tierlist.filter((obj) => obj.id === character.id).length === 0 ? '☰' : '✔'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            disabled={!data.info.prev} // Disable button if no previous page
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer' }}
          >
            Previous
          </button>
          <button
            disabled={!data.info.next} // Disable button if no next page
            onClick={() => {
              setPage((prev) => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
