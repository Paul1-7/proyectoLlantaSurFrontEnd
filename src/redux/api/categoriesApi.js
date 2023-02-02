import { apiSlice } from './apiSlice';

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `/api/v1/categorias`,
      providesTags: ['Categories'],
    }),
    getCategoryByURL: build.query({
      query: (url) => `/api/v1/categorias/url/${url}`,
      providesTags: ['Categories'],
    }),
  }),
});

export default categoriesApiSlice;

export const { useGetCategoriesQuery, useGetCategoryByURLQuery } = categoriesApiSlice;
