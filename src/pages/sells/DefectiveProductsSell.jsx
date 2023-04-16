import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import Controls from '~/components/forms/Control';
import { useSnackbar } from 'notistack';

const customData = (sale) => {
  const data = sale.map(({ idVenta, idProd, stock, producto, cantidad }) => ({
    idVenta,
    idProd,
    producto: producto.nombre,
    fecha: new Date(),
    cantidadVendida: cantidad,
    cantidad: 0,
    descripcion: '',
    stock,
  }));

  return data;
};

function DefectiveProductsSell({ data = [] }) {
  const { control } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const { fields, update, append } = useFieldArray({
    control,
    name: 'data',
  });

  const watch = useWatch({ name: 'data' }) ?? [];

  useEffect(() => {
    if (watch.length <= 0) return;

    watch.forEach((item, index) => {
      if (item.cantidad > item.stock || item.cantidad > item.cantidadVendida) {
        const msg = `la cantidad del producto ${item.producto} excede el stock disponible o la cantidad vendida`;
        enqueueSnackbar(msg, {
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          autoHideDuration: 4000,
          variant: 'error',
        });
        update(index, { ...item, cantidad: 0 });
      }
    });
  }, [watch]);

  useEffect(() => {
    if (!data.length || fields.length) return;

    const dataTransformed = customData(data);
    append(dataTransformed);
  }, [data]);

  return (
    <>
      <Box>
        <Typography variant="subtitle1" gutterBottom align="center">
          Detalle de la venta
        </Typography>
      </Box>

      <Grid container wrap="wrap" spacing={1}>
        {fields.map((item, index) => (
          <Fragment key={item.id}>
            <Grid item xs={12} sm={4}>
              <Controls.Input label="Producto" disabled name={`data.${index}.producto`} isArray />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Controls.Input label="Cantidad vendida" disabled name={`data.${index}.cantidadVendida`} isArray />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Controls.Input label="Stock disponible" disabled name={`data.${index}.stock`} isArray />
            </Grid>
            <Grid item xs={12} sm={1} sx={{ position: 'relative' }}>
              <Controls.Input
                label="Cantidad a cambiar"
                name={`data.${index}.cantidad`}
                isArray
                type="number"
                HelperTextProps={{
                  sx: {
                    position: { md: 'absolute' },
                    right: '-10rem',
                    bottom: '-1.2rem',
                    width: '20rem',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5} sx={{ mb: { xs: 3, sm: 0 } }}>
              <Controls.Input label="Descripcion" name={`data.${index}.descripcion`} isArray />
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </>
  );
}
export default DefectiveProductsSell;

DefectiveProductsSell.propTypes = {
  data: PropTypes.array,
};
