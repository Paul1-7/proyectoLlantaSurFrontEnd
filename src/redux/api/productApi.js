const { apiSlice } = require('./apiSlice');

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `/api/v1/productos`,
      providesTags: ['Products']
    })
  })
});

export default productsApiSlice;

export const { useGetProductsQuery } = productsApiSlice;
