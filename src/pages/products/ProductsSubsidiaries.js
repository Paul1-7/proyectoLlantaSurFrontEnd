import { Container, FormControl, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import axios from 'apis/apis';
import useAxios from 'hooks/useAxios';
import Controls from 'components/forms/Control';

const initialForm = {
  idSuc: '',
  nombre: '',
  stock: ''
};

const ProductsSubsidiaries = () => {
  const [resGet, , loadingGet, axiosFetchGet] = useAxios();
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: 'sucursales'
  });

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/sucursales`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resGet.length > 0) {
      resGet.forEach(({ nombre, id: idSuc }) => append({ ...initialForm, nombre, idSuc }));
    }
  }, [resGet, append]);

  return (
    <Container>
      <Typography variant="subtitle1" gutterBottom>
        Sucursales
      </Typography>

      {fields.map((item, index) => (
        <FormControl disabled={loadingGet} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Controls.Input label="Sucursal" disabled name={`sucursales.${index}.nombre`} isArray />
            <Controls.Input label="Stock" name={`sucursales.${index}.stock`} isArray />
          </Grid>
        </FormControl>
      ))}
    </Container>
  );
};
export default ProductsSubsidiaries;
