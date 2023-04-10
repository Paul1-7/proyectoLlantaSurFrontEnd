import PropTypes from 'prop-types';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
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
import DataTable from '~/components/dataTable/DataTable';
import { COLUMNS } from '~/constants/dataTable';
import { DataTableProvider } from '~/contexts/DataTableContext';
import { Link } from 'react-router-dom';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import useAuth from '~/hooks/useAuth';
import ProductsPurchases from './ProductsPurchases';
import ProductsSubsidiariesPurchases from './ProductsSubsidiariesPurchases';

const initialForm = {
  fecha: new Date().toLocaleDateString(),
  idEmp: '',
  idProv: { nombre: 'Ninguno', id: '0' },
  codCompra: '',
  detalle: [],
  sucursalesProductos: [],
};

const customDataProviders = ({ data = [] }) => {
  const newData = data
    .filter(({ estado }) => estado === 1)
    .map(({ nombre, id }) => ({
      id,
      nombre,
    }));

  return { data: newData };
};

const customDataProducts = ({ data }) => {
  const newData = data
    .filter(({ estado }) => estado === 1)
    .map(({ id, nombre, precioVenta, precioCompra }) => ({
      id,
      nombre,
      precioVenta,
      precioCompra,
    }));

  return { data: newData };
};

const btnActions = { add: true };

export default function AddPurchasesForm() {
  const { auth } = useAuth();
  const { nombre = '', apellido = '', idUsuario } = auth?.user ?? {};
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [resPost, errorPost, loadingPost, axiosFetchPost, , setErrorPost] = useAxios();
  const [resGetProviders, errorGetProviders, loadingGetProviders, axiosFetchGetProviders, , setErrorProviders] =
    useAxios({ responseCb: customDataProviders });
  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts, , setErrorProducts] = useAxios({
    responseCb: customDataProducts,
  });

  useSnackBarMessage({
    errors: [errorGetProducts, errorGetProviders, errorPost],
    setErrors: [setErrorProducts, setErrorProviders, setErrorPost],
  });

  useEffect(() => {
    axiosFetchGetProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos`,
    });
    axiosFetchGetProviders({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/proveedores`,
    });
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema.purchases),
    defaultValues: { ...initialForm, idEmp: `${nombre} ${apellido}` },
    mode: 'all',
    criteriaMode: 'all',
  });
  console.log(methods.watch());

  const onSubmit = (data) => {
    const idProv = data.idProv.id;
    const sucursalesProductos = [];
    data.sucursalesProductos.forEach(({ idProd, sucursales }) => {
      sucursales.forEach((sucursal) => {
        sucursalesProductos.push({ ...sucursal, idProd });
      });
    });

    const newData = {
      ...data,
      idProv,
      idEmp: idUsuario,
      sucursalesProductos,
    };

    axiosFetchPost({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/compras`,
      requestConfig: {
        ...newData,
      },
    });
  };

  return (
    <Page title="Nueva compra">
      <DataTableProvider>
        <Container
          maxWidth={themeStretch ? false : 'xl'}
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <BreadcrumbsCustom />
          <Typography variant="h3" component="h1">
            Nueva compra
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Registra una nueva compra
          </Typography>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
              autoComplete="off"
            >
              <Fieldset title="Datos de la compra *">
                <Grid container wrap="wrap" spacing={1}>
                  <Grid item xs={12} md={6}>
                    <Controls.Input name="fecha" label="Fecha" disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controls.Input name="codCompra" label="Código de compra" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controls.Input name="idEmp" label="Empleado" disabled />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack flexDirection="row" gap={1} sx={{ position: 'relative' }}>
                      <Controls.Autocomplete
                        name="idProv"
                        label="Proveedor"
                        items={resGetProviders}
                        loading={loadingGetProviders}
                        HelperTextProps={{ sx: { position: 'absolute', bottom: '-.8rem' } }}
                      />
                      <Button LinkComponent={Link} to={PATH_MODULES.providers.new} variant="outlined" size="small">
                        Nuevo proveedor
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
                <Grid container spacing={2} direction={{ md: 'row-reverse' }}>
                  <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                    <div>
                      <Box>
                        <Typography variant="subtitle1" gutterBottom align="center">
                          Lista de productos
                        </Typography>
                        <Grid container justifyContent="end">
                          <Grid item>
                            <Button LinkComponent={Link} to={PATH_MODULES.products.new} variant="outlined" size="small">
                              Nuevo producto
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      <DataTable
                        columns={COLUMNS.productsToPurchase}
                        rows={resGetProducts}
                        loading={loadingGetProducts || loadingGetProviders}
                        error={errorGetProducts}
                        btnActions={btnActions}
                        size="small"
                        width="100%"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                    <ProductsPurchases />
                  </Grid>
                </Grid>
                <Typography variant="subtitle1" align="center" sx={{ pb: 3 }}>
                  Actualizar stock de sucursales
                </Typography>
                <ProductsSubsidiariesPurchases />
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
            <Navigate to={PATH_MODULES.purchases.root} replace state={resPost} />
          )}
        </Container>
      </DataTableProvider>
    </Page>
  );
}

AddPurchasesForm.propTypes = {
  title: PropTypes.string,
};
