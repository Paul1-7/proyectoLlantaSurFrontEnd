import { apiSlice } from './apiSlice';

const sliderApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSlidersImages: build.query({
      query: () => `/api/v1/sliders-images`,
      providesTags: ['Sliders'],
    }),
  }),
});

export default sliderApiSlice;

export const { useGetSlidersImagesQuery } = sliderApiSlice;
