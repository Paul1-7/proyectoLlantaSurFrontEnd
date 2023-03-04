import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '~/config';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: config.BASE_URL }),
  tagTypes: ['Products', 'Categories', 'Brands', 'Discounts'],
  endpoints: () => ({}),
});
