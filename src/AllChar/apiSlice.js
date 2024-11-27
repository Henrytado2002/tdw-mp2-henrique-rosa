import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the Rick and Morty API slice
const apiSlice = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  tagTypes: ['Character'], // Tag for cache invalidation
  endpoints: (builder) => ({
    // Fetch all characters with pagination
    fetchCharacters: builder.query({
      query: (page = 1) => `character?page=${page}`,
      providesTags: (result) =>
        result?.results
          ? [...result.results.map(({ id }) => ({ type: 'Character', id })), { type: 'Character', id: 'LIST' }]
          : [{ type: 'Character', id: 'LIST' }],
    }),

    // Fetch a single character by ID
    fetchCharacterById: builder.query({
      query: (id) => `character/${id}`,
      providesTags: (result, error, id) => [{ type: 'Character', id }],
    }),

    // Fetch all episodes
    fetchEpisodes: builder.query({
      query: (page = 1) => `episode?page=${page}`,
      providesTags: [{ type: 'Episode', id: 'LIST' }],
    }),
  }),
});

export const {
  useFetchCharactersQuery,
  useFetchCharacterByIdQuery,
  useFetchEpisodesQuery,
} = apiSlice;

export default apiSlice;