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
import { TABLE_STATES } from '~/constants/dataTable';

import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { PATH_MODULES } from '~/routes/paths';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import { formatDateToLocal, getBOBCurrency } from '~/utils/dataHandler';
import Fieldset from '~/components/forms/Fieldset';
import { Label } from '~/components';

export default function DetailDiscounts() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [resGetDiscount, errorGetDiscount, loadingGetDiscount, axiosFetchGetDiscount, , setErrorGetDiscount] =
    useAxios();
  useSnackBarMessage({
    errors: [errorGetDiscount],
    setErrors: [setErrorGetDiscount],
  });

  const { id } = useParams();

  useEffect(() => {
    axiosFetchGetDiscount({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/descuentos/${id}`,
    });
  }, []);

  return (
    <Page title="Detalle ventas" sx={{ position: 'relative' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGetDiscount}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph sx={{ displayPrint: 'none' }}>
          Detalle del descuento
        </Typography>
        <Typography gutterBottom sx={{ paddingBottom: '1rem', displayPrint: 'none' }}>
          Muestra el detalle del descuento
        </Typography>
        <Button variant="outlined" LinkComponent={Link} to={`${PATH_MODULES.discounts.modify}/${id}`}>
          Modificar
        </Button>
        {!Array.isArray(resGetDiscount) && (
          <Fieldset title="Detalle de descuento">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} container flexDirection="row" gap={2} alignItems="center">
                <Typography variant="subtitle1">Nombre:</Typography>
                <Typography variant="subtitle2">{resGetDiscount.nombre}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container flexDirection="row" gap={2} alignItems="center">
                <Typography variant="subtitle1">Fecha de inicio:</Typography>
                <Typography variant="subtitle2">{formatDateToLocal(resGetDiscount.fechaInicio)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container flexDirection="row" gap={2} alignItems="center">
                <Typography variant="subtitle1">Fecha de finalizacíon:</Typography>
                <Typography variant="subtitle2">{formatDateToLocal(resGetDiscount.fechaFin)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} container flexDirection="row" gap={2} alignItems="center">
                <Typography variant="subtitle1">Estado:</Typography>
                <Label color={TABLE_STATES.active[resGetDiscount.estado].variant}>
                  {TABLE_STATES.active[resGetDiscount.estado].name}{' '}
                </Label>
              </Grid>
            </Grid>

            <TableContainer sx={{ paddingTop: '1rem' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>PRODUCTOS</TableCell>
                    <TableCell align="center">CANTIDAD MAXIMA</TableCell>
                    <TableCell align="center">PRECIO DE DESCUENTO</TableCell>
                    <TableCell align="center">PRECIO ORIGINAL</TableCell>
                  </TableRow>
                </TableHead>
                {!Array.isArray(resGetDiscount) && !loadingGetDiscount && (
                  <TableBody>
                    {resGetDiscount.productos.map(({ producto, cantMax, precio }, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {producto.nombre}
                        </TableCell>
                        <TableCell align="center">{cantMax}</TableCell>
                        <TableCell align="center">{getBOBCurrency(precio)}</TableCell>
                        <TableCell align="center">{getBOBCurrency(producto.precioVenta)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Fieldset>
        )}
      </Container>
    </Page>
  );
}
