import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import axios from 'apis/apis';
import useAxios from 'hooks/useAxios';
import Controls from 'components/forms/Control';

const initialForm = {
  idSuc: '',
  nombre: '',
  stock: ''
};

const ProductsSubsidiaries = ({ data }) => {
  const [resGet, , , axiosFetchGet] = useAxios();
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
      const idSucArray = data.map(({ idSuc }) => idSuc);
      resGet.forEach(({ nombre, id: idSuc }, index) => {
        console.log(data[index]);
        if (idSucArray.includes(idSuc)) append(data[index]);
        else append({ ...initialForm, nombre, idSuc });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Controls.Input label="Sucursal" disabled name={`sucursales.${index}.nombre`} isArray />
          <Controls.Input label="Stock" name={`sucursales.${index}.stock`} isArray />
        </Fragment>
      ))}
    </>
  );
};
export default ProductsSubsidiaries;

ProductsSubsidiaries.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};