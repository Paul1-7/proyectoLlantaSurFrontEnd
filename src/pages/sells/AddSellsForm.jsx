import PropTypes from 'prop-types';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import useAxios from '~/hooks/useAxios';
import Page from '~/components/Page';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useSettings from '~/hooks/useSettings';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import Controls from '~/components/forms/Control';
import Fieldset from '~/components/forms/Fieldset';
import { LoadingButton } from '@mui/lab';
import { Clear, Save } from '@mui/icons-material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import { Navigate } from 'react-router';
import { PATH_MODULES } from '~/routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import DataTable from '~/components/dataTable/DataTable';
import { COLUMNS } from '~/constants/dataTable';
import { DataTableProvider } from '~/contexts/DataTableContext';
import { Link } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import ProductsSell from './ProductSell';

const initialForm = {
  fecha: new Date().toLocaleDateString(),
  idCliente: { nombre: 'Ninguno', id: '0' },
  idVendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
  idSucursal: '',
  productos: [],
};

const customDataCustomers = ({ data = [] }) => {
  const newData = data
    .filter(({ estado }) => estado === 1)
    .map(({ nombre, apellido, ciNit, idUsuario }) => ({
      nombre: `${nombre} ${apellido}  -  ci: ${ciNit}`,
      idCliente: idUsuario,
    }));

  return { data: newData };
};

const currentSubsidiaryStock = (idSuc, subsidiaries) => {
  const value = subsidiaries?.find((subsidiary) => subsidiary.id === idSuc);

  return value ? value.SucursalesProductos.stock : '0';
};

const btnActions = { add: true };

export default function AddSellsForm() {
  const { auth } = useAuth();
  const { nombre: nombreSucursal, id: idSuc } = auth?.user.sucursal ?? {};
  const { nombre, apellido, idUsuario } = auth?.user ?? {};
  const axiosPrivate = useAxiosPrivate();

  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

  const customDataProducts = ({ data }) => {
    const newData = data
      .filter(({ estado }) => estado === 1)
      .map(({ id, nombre, precioVenta, sucursales, stockMin }) => ({
        id,
        nombre,
        precio: precioVenta,
        stockMin,
        cantidad: currentSubsidiaryStock(idSuc, sucursales),
      }));

    return { data: newData };
  };
  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios({
    responseCb: customDataProducts,
  });
  const [resGetCustomers, , loadingGetCustomers, axiosFetchGetCustomers] = useAxios({
    responseCb: customDataCustomers,
  });

  useEffect(() => {
    axiosFetchGetCustomers({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/clientes`,
    });
    axiosFetchGetProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos`,
    });
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema.sells),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    data.idVendedor = idUsuario;
    data.idSucursal = idSuc;
    data.idCliente = data.idCliente.idCliente;
    axiosFetchPost({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/ventas`,
      requestConfig: {
        ...data,
      },
    });
  };

  useEffect(() => {
    if (Array.isArray(resPost) && errorPost) {
      const severity = 'error';

      enqueueSnackbar(errorPost?.message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
      });
    }
  }, [errorPost]);

  return (
    <Page title="Nueva venta">
      <DataTableProvider>
        <Container
          maxWidth={themeStretch ? false : 'xl'}
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <BreadcrumbsCustom />
          <Typography variant="h3" component="h1">
            Nueva venta
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Registra una nueva venta
          </Typography>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
              autoComplete="off"
            >
              <Fieldset title="Datos de la venta *">
                <Grid container wrap="wrap" spacing={1}>
                  <Grid item xs={12} md={6}>
                    <Controls.Input name="fecha" label="Fecha" disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth size="small" disabled value={`${nombre} ${apellido}`} label="Vendedor" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth size="small" disabled value={nombreSucursal} label="sucursal" />
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 1, position: 'relative' }}>
                    <Controls.Autocomplete
                      name="idCliente"
                      label="Cliente"
                      items={resGetCustomers}
                      loading={loadingGetCustomers}
                      HelperTextProps={{ sx: { position: 'absolute', bottom: '-.5rem', left: '1rem' } }}
                    />
                    <Button LinkComponent={Link} to={PATH_MODULES.customers.new} variant="outlined" size="small">
                      Nuevo cliente
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction={{ md: 'row-reverse' }}>
                  <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                    <div>
                      <Box>
                        <Typography variant="subtitle1" gutterBottom align="center">
                          Lista de productos
                        </Typography>
                      </Box>
                      <DataTable
                        columns={COLUMNS.productsToSell}
                        rows={resGetProducts}
                        loading={loadingGetProducts}
                        error={errorGetProducts}
                        btnActions={btnActions}
                        size="small"
                        width="100%"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                    <ProductsSell />
                  </Grid>
                </Grid>
              </Fieldset>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Button
                  startIcon={<Clear />}
                  variant="outlined"
                  color="error"
                  LinkComponent={Link}
                  to={PATH_MODULES.sells.root}
                >
                  Cancelar
                </Button>
                <LoadingButton
                  loading={loadingPost}
                  type="submit"
                  loadingPosition="start"
                  startIcon={<Save />}
                  variant="outlined"
                >
                  Guardar
                </LoadingButton>
              </Box>
            </form>
          </FormProvider>
          {!loadingPost && !errorPost && !Array.isArray(resPost) && (
            <Navigate to={PATH_MODULES.sells.root} replace state={resPost} />
          )}
        </Container>
      </DataTableProvider>
    </Page>
  );
}

AddSellsForm.propTypes = {
  title: PropTypes.string,
};
