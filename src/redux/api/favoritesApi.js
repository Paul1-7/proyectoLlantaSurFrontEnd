import { apiSlice } from './apiSlice';

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    deleteFavorite: build.mutation({
      query: (id) => ({
        url: `/data/${id}`,
        method: 'DELETE',
      }),
    }),
    getFavorites: build.query({
      query: (id) => `/api/v1/favoritos/${id}`,
      providesTags: ['Favorites'],
    }),
    postFavorite: build.mutation({
      query: (body) => ({
        url: '/api/v1/favoritos',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default categoriesApiSlice;

export const { useGetFavoritesQuery, useDeleteFavoriteMutation, usePostFavoriteMutation } = categoriesApiSlice;
