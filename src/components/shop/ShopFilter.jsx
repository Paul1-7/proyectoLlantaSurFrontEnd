import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { Clear } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import Controls from '../forms/Control';

const initialForm = {
  nombre: '',
  descripcion: '',
  estado: '1',
};

function ShopFilter({ categories, brands, products, loading }) {
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    console.log('TCL: onSubmit -> data', data);
  };
  return (
    <Card sx={{ p: 2, minHeight: '100vh' }}>
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
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              autoComplete="off"
            >
              <Controls.SelectChip name="categories" label="Categorias" items={categories} />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Button startIcon={<Clear />} variant="outlined" color="error" size="small">
                  Limpiar
                </Button>
                <Button type="submit" startIcon={<Clear />} variant="outlined" size="small">
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
};

export default ShopFilter;
