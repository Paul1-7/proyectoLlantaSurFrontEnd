import * as yup from 'yup';

const productsFilter = yup.object().shape({
  categories: yup.array(),
  brands: yup.array(),
  priceRange: yup.array().min(2),
});

export default productsFilter;
