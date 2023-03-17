import { Divider, FormHelperText, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, Fragment } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useAxios from '~/hooks/useAxios';
import Controls from '~/components/forms/Control';
import useErrorMessage from '~/hooks/useErrorMessage';

const customDataSubsidiaries = ({ data }) => {
  const newData = data.map(({ id, nombre }) => ({ idSuc: id, nombre, stock: 1 }));
  return { data: newData };
};

function ProductsSubsidiariesPurchases({ data = [] }) {
  const axiosPrivate = useAxiosPrivate();
  const [resGetSubsidiaries, errorGetSubsidiaries, , axiosFetchGetSubsidiaries] = useAxios({
    responseCb: customDataSubsidiaries,
  });
  const { control, formState } = useFormContext();
  const watchProducts = useWatch({ control, name: 'detalle' });
  const errorsSubsiProd = formState.errors?.sucursalesProductos;

  useErrorMessage({ errors: [errorGetSubsidiaries, errorGetSubsidiaries] });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'sucursalesProductos',
  });

  useEffect(() => {
    axiosFetchGetSubsidiaries({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/sucursales`,
    });
  }, []);

  useEffect(() => {
    if (!watchProducts?.length && !fields.length) return;

    const idProdWatch = watchProducts.map(({ idProd }) => idProd);
    const idProdFields = fields.map(({ idProd }) => idProd);

    watchProducts.forEach(({ idProd, nombre, precioVenta, cantidad }, index) => {
      if (!idProdFields.includes(idProd))
        append({
          idProd,
          nombre,
          precioVenta,
          cantMax: cantidad,
          sucursales: resGetSubsidiaries,
        });
      else {
        update(index, {
          idProd,
          nombre,
          precioVenta,
          cantMax: cantidad,
          sucursales: fields[index].sucursales,
        });
      }
    });

    let deleteField = null;

    fields.forEach(({ idProd }, index) => {
      if (!idProdWatch.includes(idProd)) deleteField = index;
    });

    if (deleteField !== null) remove(deleteField);
    deleteField = null;
  }, [watchProducts]);

  return (
    <Grid container spacing={2}>
      {fields.map((item, index) => (
        <Fragment key={item.id}>
          <Grid item sx={{ width: '100%', mt: -3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Dato del producto
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controls.Input label="Nombre" disabled name={`sucursalesProductos.${index}.nombre`} isArray />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controls.Input
              label="Precio de venta"
              name={`sucursalesProductos.${index}.precioVenta`}
              isArray
              disabled
              helperText="para cambiar este valor modifique precio de venta en el detalle"
            />
          </Grid>
          <Grid item sx={{ width: '100%', mt: -3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Sucursales
            </Typography>
          </Grid>
          {item.sucursales.map((sucursal, indexTwo) => (
            <Grid item xs={12} sm={6} key={`${index}-${sucursal.id}-${indexTwo}`}>
              <Controls.Input
                label={fields[index].sucursales[indexTwo].nombre}
                name={`sucursalesProductos.${index}.sucursales.${indexTwo}.stock`}
                type="number"
                isArray
              />
            </Grid>
          ))}
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <FormHelperText
              error={!!errorsSubsiProd?.[index]}
              color="error"
              sx={{ position: 'absolute', top: '-1.5rem' }}
            >
              {errorsSubsiProd?.[index]?.sucursales?.message ?? ' '}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sx={{ pb: 4 }}>
            <Divider />
          </Grid>
        </Fragment>
      ))}
      {fields.length === 0 && (
        <Typography variant="subtitle2" align="center" pt={3} sx={{ mx: 'auto' }}>
          No hay productos seleccionados
        </Typography>
      )}
    </Grid>
  );
}
export default ProductsSubsidiariesPurchases;

ProductsSubsidiariesPurchases.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
