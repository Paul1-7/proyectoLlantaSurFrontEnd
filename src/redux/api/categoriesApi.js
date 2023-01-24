import { apiSlice } from './apiSlice';

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `/api/v1/categorias`,
      providesTags: ['Categories'],
    }),
  }),
});

export default categoriesApiSlice;

export const { useGetCategoriesQuery } = categoriesApiSlice;
