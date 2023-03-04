import { apiSlice } from './apiSlice';

const customsProducts = (products) => {
  return products.map(({ producto, ...otherData }) => ({ ...producto, ...otherData, id: otherData.idProd }));
};

const discountsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDiscounts: build.query({
      query: () => `/api/v1/descuentos`,
      providesTags: ['Discounts'],
      transformResponse: (response) => {
        const data = response.map((item) => ({ ...item, productos: customsProducts(item.productos) }));
        return data;
      },
    }),
    getDiscount: build.query({
      query: (id) => `/api/v1/descuentos/${id}`,
      providesTags: ['Products'],
      transformResponse: (response) => {
        return { ...response, productos: customsProducts(response.productos) };
      },
    }),
  }),
});

export default discountsApi;

export const { useGetDiscountsQuery, useGetDiscountQuery } = discountsApi;
