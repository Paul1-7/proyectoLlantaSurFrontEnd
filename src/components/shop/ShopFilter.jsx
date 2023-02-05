import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import { applyFilters, applyOrderBy } from '~/redux/slices/productsShop';
import { useDispatch } from 'react-redux';
import { ITEMS_ORDER_BY } from '~/constants/shop';
import Controls from '../forms/Control';

const initialForm = {
  categories: [],
  brands: [],
  priceRange: [0, 1],
  orderBy: ITEMS_ORDER_BY.at(0).id,
};

const options = {
  categories: 'categories',
  brands: 'brands',
  priceRange: 'priceRange',
  orderBy: 'orderBy',
};

const getMaxPriceRange = (products) => {
  const productsPrice = products.map(({ precioVenta }) => precioVenta);

  return Math.max(...productsPrice);
};

function ShopFilter({ categories, brands, products = [], loading, include = [], handleCloseFilterMobile = () => {} }) {
  const dispatch = useDispatch();
  const maxPrice = getMaxPriceRange(products);
  const methods = useForm({
    resolver: yupResolver(schema.productsFilter),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const orderBy = methods.watch('orderBy');

  useEffect(() => {
    dispatch(applyOrderBy(orderBy));
  }, [orderBy]);

  const resetFilters = () => {
    methods.reset({ ...initialForm, priceRange: [0, maxPrice] });

    const filterValues = {
      idCat: [],
      idMarca: [],
      precioVenta: [],
    };
    dispatch(applyFilters(filterValues));
    handleCloseFilterMobile();
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

    dispatch(applyFilters(filterValues));
    handleCloseFilterMobile();
  };
  return (
    <Card
      sx={{
        p: '2rem 2.5rem 2rem 2rem',
        borderRadius: { xs: '0px', md: 2 },
        boxShadow: 'none',
      }}
    >
      {loading ? (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Typography variant="subtitle2" textTransform="uppercase" align="center" gutterBottom>
            Filtros
          </Typography>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              autoComplete="off"
            >
              {include.map((option) => {
                if (option === options.brands) {
                  return <Controls.Checkbox key={option} name="brands" label="Marcas" items={brands} />;
                }
                if (option === options.categories) {
                  return <Controls.Checkbox key={option} name="categories" label="Categorias" items={categories} />;
                }
                if (option === options.priceRange) {
                  return (
                    <Controls.Slider
                      key={option}
                      name="priceRange"
                      label="Rango de precio"
                      valueLabelDisplay="on"
                      min={0}
                      max={maxPrice}
                      step={5}
                    />
                  );
                }
                if (option === options.orderBy) {
                  return (
                    <Fragment key={option}>
                      <Typography variant="subtitle2" textTransform="uppercase" align="center" gutterBottom>
                        Ordenar
                      </Typography>
                      <Controls.RadioGroup name="orderBy" items={ITEMS_ORDER_BY} label="" />
                    </Fragment>
                  );
                }
                return null;
              })}
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
        </>
      )}
    </Card>
  );
}

ShopFilter.propTypes = {
  loading: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.object),
  brands: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  include: PropTypes.arrayOf(PropTypes.string),
  handleCloseFilterMobile: PropTypes.func,
};

export default ShopFilter;
