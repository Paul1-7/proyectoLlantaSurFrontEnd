import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import { appyFilters } from '~/redux/slices/productsShop';
import { useDispatch } from 'react-redux';
import Controls from '../forms/Control';
import Scrollbar from '../Scrollbar';

const initialForm = {
  categories: [],
  brands: [],
  priceRange: [0, 1],
};

const getMaxPriceRange = (products) => {
  const productsPrice = products.map(({ precioVenta }) => precioVenta);

  return Math.max(...productsPrice);
};

function ShopFilter({ categories, brands, products = [], loading }) {
  const dispatch = useDispatch();
  const maxPrice = getMaxPriceRange(products);
  const methods = useForm({
    resolver: yupResolver(schema.productsFilter),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const resetFilters = () => {
    methods.reset({ ...initialForm, priceRange: [0, maxPrice] });

    const filterValues = {
      idCat: [],
      idMarca: [],
      precioVenta: [],
    };
    dispatch(appyFilters(filterValues));
  };

  useEffect(() => {
    if (!products.length) return;
    methods.setValue('priceRange', [0, maxPrice]);
  }, [products]);

  const onSubmit = (data) => {
    const { categories, brands, priceRange } = data;
    const filterValues = {
      idCat: categories,
      idMarca: brands,
      precioVenta: priceRange,
    };

    dispatch(appyFilters(filterValues));
  };
  return (
    <Card sx={{ maxHeight: '100vh', height: '100vh', overflowY: 'auto' }}>
      {loading ? (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Scrollbar sx={{ height: 1, p: 4 }}>
          <Typography variant="subtitle2" textTransform="uppercase" align="center" gutterBottom>
            Filtros
          </Typography>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              autoComplete="off"
            >
              <Controls.Slider
                name="priceRange"
                label="Rango de precio"
                valueLabelDisplay="on"
                min={0}
                max={maxPrice}
                step={5}
              />
              <Controls.Checkbox name="categories" label="Categorias" items={categories} />
              <Controls.Checkbox name="brands" label="Marcas" items={brands} />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Button variant="outlined" color="error" size="small" onClick={resetFilters}>
                  Limpiar
                </Button>
                <Button type="submit" variant="outlined" size="small">
                  Aplicar
                </Button>
              </Box>
            </form>
          </FormProvider>
        </Scrollbar>
      )}
    </Card>
  );
}

ShopFilter.propTypes = {
  loading: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.object),
  brands: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
};

export default ShopFilter;
