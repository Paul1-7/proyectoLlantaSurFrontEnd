import { useEffect } from 'react';
import {
  Backdrop,
  Box,
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
import { TABLE_STATES } from 'constants/dataTable';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import Fieldset from 'components/forms/Fieldset';
import { useSnackbar } from 'notistack';
import SnackBar from 'components/SnackBar';
import DefectiveProductsSell from './DefectiveProductsSell';

const { paymentMethods, salesTypes } = TABLE_STATES;

const idSucursalBorrar = '678197a0-69a8-4c24-89a5-bf13873cc08b';

const initialForm = {
  idSucursal: idSucursalBorrar
};

const currentSubsidiaryStock = (idSuc, subsidiaries) => {
  const value = subsidiaries?.find((subsidiary) => subsidiary.id === idSuc);

  return value ? value.Sucursales_Productos.stock : '0';
};

const salesCustomData = ({ data }) => {
  const newData = data.detalle.map((item) => ({
    ...item,
    productos: {
      ...item.productos,
      stock: currentSubsidiaryStock(idSucursalBorrar, item.productos.sucursales)
    }
  }));
  return { data: { ...data, detalle: newData } };
};

export default function ModifySell() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [resGetSale, errorGetSale, loadingGetSale, axiosFetchGetSale, , setErrorGetSale] = useAxios(salesCustomData);

  const id = location.pathname.split('/').pop();

  useEffect(() => {
    axiosFetchGetSale({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/ventas/${id}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const severity = 'error';
    let message = null;

    if (Array.isArray(resGetSale) && errorGetSale) {
      message = errorGetSale?.message;
      setErrorGetSale(null);
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorGetSale]);

  const methods = useForm({
    resolver: yupResolver(schema.sells),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    console.log('TCL: onSubmit -> data', data);
  };

  return (
    <Page title="Modificar venta" sx={{ position: 'relative' }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGetSale}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph>
          Modificar venta
        </Typography>
        <Typography gutterBottom sx={{ paddingBottom: '2rem' }}>
          Modifica la venta en caso de que uno o varios productos esten defectuosos, cambiando por unos nuevos
        </Typography>
        <Fieldset title="Datos de la venta">
          <Grid container wrap="wrap">
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Código de venta: ${resGetSale?.codVenta ?? ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Fecha: ${new Date(resGetSale?.fecha).toLocaleDateString()}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Cliente: ${resGetSale?.cliente?.nombre ?? ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Vendedor: ${resGetSale?.vendedor?.nombre ?? ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Método de pago: ${paymentMethods?.[resGetSale?.tipoVenta]?.name ?? ''}`}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" paragraph>
                {`Tipo de venta: ${salesTypes?.[resGetSale?.tipoVenta]?.name ?? ''}`}
              </Typography>
            </Grid>
          </Grid>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid container spacing={2} direction={{ md: 'row-reverse' }}>
                <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                  <div>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom align="center">
                        Lista de productos
                      </Typography>
                    </Box>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>PRODUCTO</TableCell>
                            <TableCell align="center">STOCK</TableCell>
                          </TableRow>
                        </TableHead>
                        {!Array.isArray(resGetSale) && !errorGetSale && (
                          <TableBody>
                            {resGetSale.detalle.map(({ productos }, index) => (
                              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {productos.nombre}
                                </TableCell>
                                <TableCell align="center">{productos.stock}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                  {!Array.isArray(resGetSale) && !errorGetSale && <DefectiveProductsSell data={resGetSale.detalle} />}
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Fieldset>
      </Container>
    </Page>
  );
}
