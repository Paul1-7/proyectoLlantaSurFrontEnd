import { apiSlice } from './apiSlice';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `/api/v1/productos`,
      providesTags: ['Products'],
    }),
    getBestSellingProducts: build.query({
      query: () => `/api/v1/productos/best-selling`,
      providesTags: ['Products'],
    }),
  }),
});

export default productsApiSlice;

export const { useGetProductsQuery, useGetBestSellingProductsQuery } = productsApiSlice;
