import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import Controls from '~/components/forms/Control';
import { MIconButton } from '~/components/@material-extend';
import { Clear } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const initialForm = {
  idProd: '',
  nombre: '',
  cantidad: '1',
  precio: '',
};

function DefectiveProductsSell() {
  const { control } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const { fields, remove, update } = useFieldArray({
    control,
    name: 'productos',
  });
  const watch = useWatch({ name: 'productos' }) ?? [];

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

  // useEffect(() => {
  //   if (resGet.length > 0) {
  //     const idSucArray = data.map(({ idSuc }) => idSuc);
  //     resGet.forEach(({ nombre, id: idSuc }, index) => {
  //       if (idSucArray.includes(idSuc)) append(data[index]);
  //       else append({ ...initialForm, nombre, idSuc });
  //     });
  //   }
  //
  // }, [resGet]);

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
            <Grid item xs={12} md={6}>
              <Controls.Input label="Producto" disabled name={`productos.${index}.nombre`} isArray />
            </Grid>
            <Grid item xs={12} md={2}>
              <Controls.Input label="Cantidad" name={`productos.${index}.cantidad`} isArray type="number" />
            </Grid>

            <Grid item xs={12} md={1}>
              <MIconButton
                aria-label="eliminar"
                onClick={() => {
                  remove(index);
                }}
              >
                <Clear color="error" />
              </MIconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
}
export default DefectiveProductsSell;

// DefectiveProductsSell.propTypes = {
//   data: PropTypes.object,
// };
