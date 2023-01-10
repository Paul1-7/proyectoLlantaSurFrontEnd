import PropTypes from 'prop-types';
import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import useAxios from 'hooks/useAxios';
import Page from 'components/Page';
import axios from 'apis/apis';
import useSettings from 'hooks/useSettings';
import BreadcrumbsCustom from 'components/BreadcrumbsCustom';
import Controls from 'components/forms/Control';
import Fieldset from 'components/forms/Fieldset';
import { LoadingButton } from '@material-ui/lab';
import { Clear, Save } from '@material-ui/icons';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { Navigate, useLocation } from 'react-router';
import { PATH_MODULES } from 'routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from 'components/SnackBar';
import { ITEMS_RADIO_GROUP } from 'constants/items';
import { Link } from 'react-router-dom';
import ProductsSubsidiaries from './ProductsSubsidiaries';

const initialForm = {
  nombre: '',
  precioCompra: '',
  precioVenta: '',
  fecha: new Date(),
  idProv: '0',
  idCat: '0',
  idMarca: '0',
  sucursales: [],
  imagen: null,
  estado: '1'
};

const stockOtherSubsidiary = (subsidiaries) =>
  subsidiaries.map((subsidiary) => ({
    idSuc: subsidiary.id,
    nombre: subsidiary.nombre,
    stock: subsidiary.Sucursales_Productos.stock
  }));

const customData = ({ data }) => ({
  data: {
    ...data,
    sucursales: stockOtherSubsidiary(data.sucursales)
  }
});

export default function ModifyProductForm() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [resPut, errorPut, loadingPut, axiosFetchPut, , setErrorPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(customData);
  const [resGetBrand, , , axiosFetchGetBrand] = useAxios();
  const [resGetCategory, , , axiosFetchGetCategory] = useAxios();
  const [resGetProvider, , , axiosFetchGetProvider] = useAxios();

  const id = location.pathname.split('/').pop();

  const methods = useForm({
    resolver: yupResolver(schema.products),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'imagen' && value?.file instanceof File) {
        formData.append('imagen', value?.file, value?.file?.name);
      }
      if (key === 'sucursales') {
        formData.append(key, JSON.stringify(value));
      }
      formData.append(key, value);
    });

    axiosFetchPut({
      axiosInstance: axios,
      method: 'PUT',
      url: `/api/v1/productos/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      requestConfig: formData
    });
  };

  useEffect(() => {
    axiosFetchGetBrand({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/marcas`
    });
    axiosFetchGetCategory({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/categorias`
    });
    axiosFetchGetProvider({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/proveedores`
    });
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/productos/${id}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !Array.isArray(resGet) &&
      !errorGet &&
      resGetBrand.length > 0 &&
      resGetProvider.length > 0 &&
      resGetCategory.length > 0
    ) {
      const keys = Object.keys(initialForm);
      const objectArray = Object.entries(resGet);

      objectArray.forEach(([key, value]) => {
        if (keys.includes(key) && key !== 'sucursales') {
          methods.setValue(key, String(value), { shouldValidate: true });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resGet, resGetBrand, resGetProvider, resGetCategory]);

  useEffect(() => {
    const severity = 'error';
    let message = null;

    if (Array.isArray(resPut) && errorPut) {
      message = errorPut?.message;
      setErrorPut(null);
    }

    if (Array.isArray(resGet) && errorGet) {
      message = errorGet?.message;
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPut, errorGet]);

  return (
    <Page title="Modificar producto">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Modificar producto
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Modifica una producto existente
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del producto *">
              <Grid container wrap="wrap" spacing={1}>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="nombre" label="Nombre" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="precioCompra" label="Precio de compra" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="precioVenta" label="precio de venta" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.DatePicker name="fecha" label="Fecha" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Select name="idProv" label="Proveedor" items={resGetProvider} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Select name="idMarca" label="Marca" items={resGetBrand} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Select name="idCat" label="Categoria" items={resGetCategory} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
                {!Array.isArray(resGet) && <ProductsSubsidiaries data={resGet.sucursales} />}
                <Controls.Dropzone name="imagen" sx={{ paddingLeft: '1rem' }} />
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button
                startIcon={<Clear />}
                variant="outlined"
                color="error"
                LinkComponent={Link}
                to={PATH_MODULES.products.root}
              >
                Cancelar
              </Button>
              <LoadingButton
                loading={loadingPut}
                type="submit"
                loadingPosition="start"
                startIcon={<Save />}
                variant="outlined"
                disabled={Array.isArray(resGet) && errorGet}
              >
                Guardar
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
        {!loadingPut && !errorPut && !Array.isArray(resPut) && (
          <Navigate to={PATH_MODULES.products.root} replace state={resPut} />
        )}
      </Container>
    </Page>
  );
}

ModifyProductForm.propTypes = {
  title: PropTypes.string
};
