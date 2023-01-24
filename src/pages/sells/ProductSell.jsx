import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, Fragment, useContext } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import Controls from '~/components/forms/Control';
import { MIconButton } from '~/components/@material-extend';
import { Clear } from '@mui/icons-material';
import { getBOBCurrency } from '~/utils/dataHandler';
import DataTableContext from '~/contexts/DataTableContext';
import { useSnackbar } from 'notistack';

const initialForm = {
  idProd: '',
  nombre: '',
  cantidad: '1',
  precio: '',
};

function ProductsSell({ data = null }) {
  const { control } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const { dataRow, enableButton } = useContext(DataTableContext);
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'productos',
  });
  const watch = useWatch({ name: 'productos' });

  useEffect(() => {
    if (dataRow)
      append({
        ...initialForm,
        nombre: dataRow.nombre,
        idProd: dataRow.id,
        precio: dataRow.precio,
        stock: dataRow.cantidad,
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
            <Grid item xs={12} md={1} sx={{ textAlign: 'center' }}>
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
            <Grid item xs={12} md={6}>
              <Controls.Input label="Producto" disabled name={`productos.${index}.nombre`} isArray />
            </Grid>
            <Grid item xs={12} md={2}>
              <Controls.Input label="Cantidad" name={`productos.${index}.cantidad`} isArray type="number" />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                value={getBOBCurrency(watch[index].cantidad * watch[index].precio ?? 0)}
                label="Subtotal"
                size="small"
                disabled
              />
            </Grid>
          </Grid>
        ))}
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', marginRight: '1rem' }}>
          <Typography variant="subtitle1">
            Total: {getBOBCurrency(watch.reduce((prev, current) => prev + current.precio * current.cantidad, 0))}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default ProductsSell;

ProductsSell.propTypes = {
  data: PropTypes.object,
};
