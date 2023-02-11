import { apiSlice } from './apiSlice';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `/api/v1/productos`,
      providesTags: ['Products'],
    }),
    getProduct: build.query({
      query: (id) => `/api/v1/productos/${id}`,
      providesTags: ['Products'],
    }),
    getBestSellingProducts: build.query({
      query: () => `/api/v1/productos/best-selling`,
      providesTags: ['Products'],
    }),
  }),
});

export default productsApiSlice;

export const { useGetProductsQuery, useGetBestSellingProductsQuery, useGetProductQuery } = productsApiSlice;
