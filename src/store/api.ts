import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = `https://www.omdbapi.com/`;

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ searchTerm, page }) =>
        `?apikey=67e1bb9b&type=movie&s=${searchTerm}&page=${page}`,
    }),
    getMovie: builder.query({
      query: (imdbID) => `?apikey=67e1bb9b&i=${imdbID}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieQuery } = api;
export default api;
