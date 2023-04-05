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
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { useParams } from 'react-router';
import { getBOBCurrency } from '~/utils/dataHandler';
import { usePrint } from '~/hooks/usePrint';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';

const sxNoPrint = {
  '@media print': {
    display: 'none',
  },
};

export default function DetailSeel() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [resGetPurchase, errorGetPurchase, loadingGetPurchase, axiosFetchGetPurchase, , setErrorGetPurchase] =
    useAxios();

  useSnackBarMessage({ errors: [errorGetPurchase], setErrors: [setErrorGetPurchase] });

  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({
    fileName: `Factura-${resGetPurchase?.cliente?.nombre ?? ''}`,
  });
  const { id } = useParams();

  useEffect(() => {
    axiosFetchGetPurchase({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/compras/${id}`,
    });
  }, []);

  return (
    <Page title="Detalle compra" sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
        open={loadingGetPurchase || loadingPrint}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph sx={{ displayPrint: 'none' }}>
          Detalle de la compra
        </Typography>
        <Typography gutterBottom sx={{ paddingBottom: '2rem', displayPrint: 'none' }}>
          Muestra el detalle de la compra
        </Typography>
        <Button onClick={handlePrint} variant="outlined" sx={{ displayPrint: 'none' }}>
          Imprimir detalle
        </Button>
        {!Array.isArray(resGetPurchase) && (
          <Grid
            ref={componentToPrintRef}
            sx={{
              '@media print': { padding: '2rem' },
              padding: '2.5rem 1.5rem',
              minWidth: '720px',
            }}
          >
            <Grid>
              <Typography variant="h3" align="center" paragraph>
                Detalle de compra
              </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Código de referencia: </span>
                  {resGetPurchase.codReferencia}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Código de compra: </span>
                  {resGetPurchase.codCompra}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Fecha: </span>
                  {new Date(resGetPurchase?.fecha).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Proveedor: </span>
                  {resGetPurchase.proveedor.nombre}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={sxNoPrint}>
                <Typography component="h3">
                  <span style={{ fontWeight: 600 }}>Usuario: </span>
                  {resGetPurchase.usuario.nombre ?? ''}
                </Typography>
              </Grid>
            </Grid>
            <TableContainer sx={{ paddingTop: '1rem' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PRODUCTO</TableCell>
                    <TableCell align="center">CANTIDAD</TableCell>
                    <TableCell align="center">PRECIO ADQUIRIDO</TableCell>
                    <TableCell align="center">SUBTOTAL</TableCell>
                  </TableRow>
                </TableHead>
                {!Array.isArray(resGetPurchase) && !loadingGetPurchase && (
                  <TableBody>
                    {resGetPurchase.detalle.map(({ producto, cantidad, precio, subtotal }, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {producto.nombre}
                        </TableCell>
                        <TableCell align="center">{cantidad}</TableCell>
                        <TableCell align="center">{precio.toFixed(2)}</TableCell>
                        <TableCell align="center">{subtotal.toFixed(2)}</TableCell>
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
                      <TableCell align="center">{getBOBCurrency(resGetPurchase.total)}</TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
