import { useEffect } from 'react';
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';
import useAxios from 'hooks/useAxios';
import axios from 'apis/apis';

import BreadcrumbsCustom from 'components/BreadcrumbsCustom';
import { useLocation } from 'react-router';
import { getBOBCurrency } from 'utils/dataHandler';
import { TABLE_STATES } from 'constants/dataTable';
import Fieldset from 'components/forms/Fieldset';

const { paymentMethods, salesTypes } = TABLE_STATES;

export default function DetailSeel() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  const [resGet, , loadingGet, axiosFetchGet] = useAxios();
  const id = location.pathname.split('/').pop();

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/ventas/${id}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Detalle ventas" sx={{ position: 'relative' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph>
          Detalle de venta
        </Typography>
        <Typography gutterBottom sx={{ paddingBottom: '2rem' }}>
          Muestra el detalle de la venta
        </Typography>
        <Fieldset title="Datos de la venta">
          <Grid container wrap="wrap">
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Código de venta: ${resGet?.codVenta ?? ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Fecha: ${new Date(resGet?.fecha).toLocaleDateString()}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Cliente: ${resGet?.cliente?.nombre ?? ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Vendedor: ${resGet?.vendedor?.nombre ?? ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Método de pago: ${paymentMethods?.[resGet?.tipoVenta]?.name ?? ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Tipo de venta: ${salesTypes?.[resGet?.tipoVenta]?.name ?? ''}`}
              </Typography>
            </Grid>
          </Grid>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>PRODUCTO</TableCell>
                  <TableCell align="center">CANTIDAD</TableCell>
                  <TableCell align="center">PRECIO UNITARIO</TableCell>
                  <TableCell align="center">SUBTOTAL</TableCell>
                </TableRow>
              </TableHead>
              {!Array.isArray(resGet) && (
                <TableBody>
                  {resGet.detalle.map(({ productos, cantidad, precioUni }, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {productos.nombre}
                      </TableCell>
                      <TableCell align="center">{cantidad}</TableCell>
                      <TableCell align="center">{getBOBCurrency(precioUni)}</TableCell>
                      <TableCell align="center">{getBOBCurrency(precioUni * cantidad)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} sx={{ borderBottom: 'none' }} />
                    <TableCell align="center" sx={{ fontWeight: '700' }}>
                      TOTAL
                    </TableCell>
                    <TableCell align="center">
                      {getBOBCurrency(
                        resGet.detalle.reduce((prev, current) => prev + current.precioUni * current.cantidad, 0)
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Fieldset>
      </Container>
    </Page>
  );
}
