import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Divider } from '@mui/material';
import { getDateTimeFormat } from '~/utils/dataHandler';
import Fieldset from '../forms/Fieldset';

function DefectivesProductsHistory({ data }) {
  return (
    <Fieldset title="Historial de productos defectuosos">
      {!data.length ? (
        <Typography align="center" variant="body1">
          No hay historial
        </Typography>
      ) : (
        data.map(({ cantidad, descripcion, fecha, venta, sucursal, producto }, index) => (
          <Fragment key={`${venta.codVenta}-${index}`}>
            <Grid container sx={{ p: 2 }}>
              <Grid item container gap={1} xs={6} sm={4}>
                <Typography sx={{ fontWeight: 'bold' }}>Codigo de venta:</Typography>
                <Typography>{venta.codVenta}</Typography>
              </Grid>
              <Grid item container gap={1} xs={6} sm={4}>
                <Typography sx={{ fontWeight: 'bold' }}>Fecha:</Typography>
                <Typography>{getDateTimeFormat(fecha)}</Typography>
              </Grid>
              <Grid item container gap={1} xs={6} sm={4}>
                <Typography sx={{ fontWeight: 'bold' }}>Producto:</Typography>
                <Typography>{producto.nombre}</Typography>
              </Grid>
              <Grid item container gap={1} xs={6} sm={4}>
                <Typography sx={{ fontWeight: 'bold' }}>Cantidad:</Typography>
                <Typography>{cantidad}</Typography>
              </Grid>
              <Grid item container gap={1} xs={6} sm={4}>
                <Typography sx={{ fontWeight: 'bold' }}>Sucursal:</Typography>
                <Typography>{sucursal.nombre}</Typography>
              </Grid>
              <Grid item container gap={1} xs={6} sm={4}>
                <Typography sx={{ fontWeight: 'bold' }}>Descripcion:</Typography>
                <Typography>{descripcion}</Typography>
              </Grid>
            </Grid>
            <Divider />
          </Fragment>
        ))
      )}
    </Fieldset>
  );
}
DefectivesProductsHistory.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default DefectivesProductsHistory;
