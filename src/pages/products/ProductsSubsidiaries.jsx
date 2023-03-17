import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAxios from '~/hooks/useAxios';
import Controls from '~/components/forms/Control';

const initialForm = {
  idSuc: '',
  nombre: '',
  stock: '',
};

function ProductsSubsidiaries({ data = [] }) {
  const axiosPrivate = useAxiosPrivate();
  const [resGet, , , axiosFetchGet] = useAxios();
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: 'sucursales',
  });

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/sucursales`,
    });
  }, []);

  useEffect(() => {
    if (resGet.length > 0) {
      const idSucArray = data.map(({ idSuc }) => idSuc);
      resGet.forEach(({ nombre, id: idSuc }, index) => {
        if (idSucArray.includes(idSuc)) append(data[index]);
        else append({ ...initialForm, nombre, idSuc });
      });
    }
  }, [resGet]);

  return (
    <>
      <Grid item sx={{ width: '100%' }}>
        <Typography variant="subtitle1" gutterBottom>
          Sucursales
        </Typography>
      </Grid>

      {fields.map((item, index) => (
        <Fragment key={item.id}>
          <Grid item xs={12} md={6}>
            <Controls.Input label="Sucursal" disabled name={`sucursales.${index}.nombre`} isArray />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controls.Input label="Stock" name={`sucursales.${index}.stock`} isArray />
          </Grid>
        </Fragment>
      ))}
    </>
  );
}
export default ProductsSubsidiaries;

ProductsSubsidiaries.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
