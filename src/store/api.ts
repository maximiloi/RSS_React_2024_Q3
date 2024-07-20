import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = `https://www.omdbapi.com/`;

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['Page'],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ searchTerm = 'star wars', page = 1 }) =>
        `?apikey=67e1bb9b&type=movie&s=${searchTerm}&page=${page}`,
      providesTags: () => [
        {
          type: 'Page',
        },
      ],
    }),
  }),
});

export const { useGetMoviesQuery } = api;

export default api;
