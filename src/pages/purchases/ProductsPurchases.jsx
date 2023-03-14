import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, Fragment, useContext } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import Controls from '~/components/forms/Control';
import { MIconButton } from '~/components/@material-extend';
import { Clear } from '@mui/icons-material';
import DataTableContext from '~/contexts/DataTableContext';
import { useSnackbar } from 'notistack';

const initialForm = {
  cantidad: '1',
};

function ProductsPurchases({ data = null }) {
  const { control } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const { dataRow, enableButton } = useContext(DataTableContext);
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'detalle',
  });
  const watch = useWatch({ name: 'detalle' });

  useEffect(() => {
    if (dataRow)
      append({
        ...initialForm,
        nombre: dataRow.nombre,
        idProd: dataRow.id,
        precioVenta: dataRow.precioVenta,
        precioCompra: dataRow.precioCompra,
      });
  }, [data, dataRow]);

  useEffect(() => {
    if (watch.length <= 0) return;

    watch.forEach((item, index) => {
      if (item.cantidad > item.stock) {
        const msg = `la cantidad del producto ${item.nombre} excede el stock disponible`;
        enqueueSnackbar(msg, {
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          autoHideDuration: 4000,
          variant: 'error',
        });
        update(index, { ...item, cantidad: 1 });
      }
    });
  }, [watch]);

  return (
    <>
      <Box>
        <Typography variant="subtitle1" gutterBottom align="center">
          Detalle
        </Typography>
      </Box>
      <Box sx={{ marginTop: '16px' }}>
        {fields.map((item, index) => (
          <Grid container wrap="wrap" spacing={1} key={item.id}>
            <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
              <MIconButton
                aria-label="eliminar"
                color="error"
                onClick={() => {
                  const id = watch?.[index].idProd;
                  remove(index);
                  enableButton(id);
                }}
              >
                <Clear color="error" />
              </MIconButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controls.Input label="Producto" disabled name={`detalle.${index}.nombre`} isArray />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controls.Input label="Cantidad" name={`detalle.${index}.cantidad`} isArray type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controls.Input label="Precio de compra" name={`detalle.${index}.precioCompra`} isArray type="number" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controls.Input label="Precio de venta" name={`detalle.${index}.precioVenta`} isArray type="number" />
            </Grid>
          </Grid>
        ))}
        {fields.length === 0 && (
          <Typography variant="subtitle2" align="center" pt={3}>
            No hay detalle seleccionados
          </Typography>
        )}
      </Box>
    </>
  );
}
export default ProductsPurchases;

ProductsPurchases.propTypes = {
  data: PropTypes.object,
};
