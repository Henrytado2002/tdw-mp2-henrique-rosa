import React, { useState } from 'react';
import { useFetchCharactersQuery } from './apiSlice';

function AllCharList() {
  const [page, setPage] = useState(1); // State to keep track of the current page
  const { data, error, isLoading } = useFetchCharactersQuery(page);

  // Loading and error states
  if (isLoading) return <div>Loading characters...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Render characters
  return (
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
  );
}

export default AllCharList;