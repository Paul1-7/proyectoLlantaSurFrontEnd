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
  Typography,
  Button,
} from '@mui/material';
import useSettings from '~/hooks/useSettings';
import Page from '~/components/Page';
import useAxios from '~/hooks/useAxios';
import axios from '~/apis/apis';
import { conversorNumerosALetras as ClaseConversor } from 'conversor-numero-a-letras-es-ar';

import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { useLocation } from 'react-router';
import { getBOBCurrency } from '~/utils/dataHandler';
import { TABLE_STATES } from '~/constants/dataTable';
import { usePrint } from '~/hooks/usePrint';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';

const { paymentMethods, salesTypes } = TABLE_STATES;

const getTotal = (items) => items.reduce((prev, current) => prev + current.precioUni * current.cantidad, 0);

const sxNoPrint = {
  '@media print': {
    display: 'none',
  },
};

export default function DetailSeel() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [resGetSale, errorGetSale, loadingGetSale, axiosFetchGetSale, , setErrorGetSale] = useAxios();
  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({
    fileName: `Factura-${resGetSale?.cliente?.nombre ?? ''}`,
  });
  const [
    resGetBusinessData,
    errorGetBusinessData,
    loadingGetBusinessData,
    axiosFetchGetBusinessData,
    ,
    setErrorGetBusinessData,
  ] = useAxios();
  const conversorNumerico = new ClaseConversor();
  const total = getTotal(resGetSale?.detalle ?? []);
  const id = location.pathname.split('/').pop();

  useEffect(() => {
    axiosFetchGetSale({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/ventas/${id}`,
    });
    axiosFetchGetBusinessData({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/datos-negocio`,
    });
  }, []);

  useEffect(() => {
    const severity = 'error';
    let message = null;

    if (Array.isArray(resGetSale) && errorGetSale) {
      message = errorGetSale?.message;
      setErrorGetSale(null);
    }

    if (Array.isArray(resGetBusinessData) && errorGetBusinessData) {
      message = errorGetBusinessData?.message;
      setErrorGetBusinessData(null);
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
      });
    }
  }, [errorGetSale]);

  return (
    <Page title="Detalle ventas" sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
        open={loadingGetSale || loadingPrint || loadingGetBusinessData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph sx={{ displayPrint: 'none' }}>
          Detalle de venta
        </Typography>
        <Typography gutterBottom sx={{ paddingBottom: '2rem', displayPrint: 'none' }}>
          Muestra el detalle de la venta
        </Typography>
        <Button onClick={handlePrint} variant="outlined" sx={{ displayPrint: 'none' }}>
          Imprimir factura
        </Button>
        {!Array.isArray(resGetSale) && (
          <Grid
            ref={componentToPrintRef}
            sx={{
              '@media print': { padding: '2rem' },
              padding: '2.5rem 1.5rem',
              minWidth: '720px',
            }}
          >
            <Grid container wrap="wrap" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1" align="center">
                  {resGetBusinessData.nombre}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Casa Matriz
                </Typography>
                <Typography variant="body2" align="center">
                  {resGetBusinessData.direccion}
                </Typography>
                <Typography variant="body2" align="center">
                  {`Teléfono: ${resGetBusinessData.tel}`}
                </Typography>
                <Typography variant="body2" align="center" paragraph>
                  {resGetBusinessData.ciudad}
                </Typography>
              </Grid>
              <Grid item container width={250}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">NIT</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{resGetBusinessData.numDoc}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Factura N°</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{resGetSale?.codVenta ?? ''}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">CUF</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{resGetBusinessData.cuf}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">ACTIVIDAD</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">{resGetBusinessData.actividadEco}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Typography variant="h3" align="center" paragraph>
                Factura
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h6" align="center" paragraph>
                (Con Derecho a Credito Fiscal)
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Fecha: </span>
                  {new Date(resGetSale?.fecha).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>NIT/CI/CEX: </span>
                  {resGetSale?.cliente?.ciNit ?? ''}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Nombre/Razon social: </span>
                  {resGetSale?.cliente?.nombre ?? ''}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={sxNoPrint}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Vendedor: </span>
                  {resGetSale?.vendedor?.nombre ?? ''}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={sxNoPrint}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Método de pago: </span>
                  {paymentMethods?.[resGetSale?.tipoVenta]?.name ?? ''}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={sxNoPrint}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Tipo de venta: </span>
                  {salesTypes?.[resGetSale?.tipoVenta]?.name ?? ''}
                </Typography>
              </Grid>
            </Grid>
            <TableContainer sx={{ paddingTop: '1rem' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PRODUCTO</TableCell>
                    <TableCell align="center">CANTIDAD</TableCell>
                    <TableCell align="center">PRECIO UNITARIO</TableCell>
                    <TableCell align="center">SUBTOTAL</TableCell>
                  </TableRow>
                </TableHead>
                {!Array.isArray(resGetSale) && (
                  <TableBody>
                    {resGetSale.detalle.map(({ productos, cantidad, precioUni }, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {productos.nombre}
                        </TableCell>
                        <TableCell align="center">{cantidad}</TableCell>
                        <TableCell align="center">{precioUni}</TableCell>
                        <TableCell align="center">{(precioUni * cantidad).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        sx={{
                          borderBottom: 'none',
                          '@media print': {
                            borderBottom: 'none',
                            borderLeft: 'none',
                          },
                        }}
                      />
                      <TableCell align="center" sx={{ fontWeight: '700' }}>
                        TOTAL
                      </TableCell>
                      <TableCell align="center">{getBOBCurrency(total)}</TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <Grid>
              <Typography sx={{ fontWeight: '700', pt: 1 }} variant="body2" paragraph>
                {`Son: ${conversorNumerico.convertToText(parseInt(total, 10))} ${
                  (total - parseInt(total, 10)).toFixed(2) * 100
                }/100 Bolivianos`}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2" paragraph align="center" sx={{ textTransform: 'uppercase' }}>
                &quot;ESTA FACTURA CONTRIBUYE AL DESARROLLO DE NUESTRO PAÍS, EL USO ILÍCITO DE ÉSTA SERÁ SANCIONADO DE
                ACUERDO A LEY!&quot;
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="caption" align="center" paragraph>
                Ley N° 453: Tienes derecho a recibir información sobre las caracteristicas y contenidos de los servicios
                que utilices
              </Typography>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
