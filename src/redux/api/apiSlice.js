import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '~/config';

const options = { baseUrl: config.BASE_URL };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(options),
  tagTypes: ['Products', 'Categories', 'Brands', 'Discounts', 'Sliders'],
  endpoints: () => ({}),
});
