import { apiSlice } from './apiSlice';

const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: () => `/api/v1/marcas`,
      providesTags: ['Brands'],
    }),
  }),
});

export default brandsApiSlice;

export const { useGetBrandsQuery } = brandsApiSlice;
