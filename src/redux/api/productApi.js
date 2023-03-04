import { isCurrentDateInRange } from '~/utils/dataHandler';
import { apiSlice } from './apiSlice';

const customsDiscounts = (products) => {
  return products
    .map(({ descuento, cantMax, precio: precioDesc }) => ({ ...descuento, cantMax, precioDesc }))
    .filter(({ fechaInicio, fechaFin }) => isCurrentDateInRange(fechaInicio, fechaFin));
};

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `/api/v1/productos`,
      providesTags: ['Products'],
    }),
    getProduct: build.query({
      query: (id) => `/api/v1/productos/${id}`,
      providesTags: ['Products'],
      transformResponse: (response) => {
        return { ...response, descuentos: customsDiscounts(response.descuentosProductos) };
      },
    }),
    getBestSellingProducts: build.query({
      query: () => `/api/v1/productos/best-selling`,
      providesTags: ['Products'],
    }),
  }),
});

export default productsApiSlice;

export const { useGetProductsQuery, useGetBestSellingProductsQuery, useGetProductQuery } = productsApiSlice;
