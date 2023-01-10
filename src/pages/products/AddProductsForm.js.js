import PropTypes from 'prop-types';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import useAxios from 'hooks/useAxios';
import Page from 'components/Page';
import axios from 'apis/apis';
import useSettings from 'hooks/useSettings';
import BreadcrumbsCustom from 'components/BreadcrumbsCustom';
import Controls from 'components/forms/Control';
import Fieldset from 'components/forms/Fieldset';
import { LoadingButton } from '@material-ui/lab';
import { Save } from '@material-ui/icons';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { Navigate } from 'react-router';
import { PATH_MODULES } from 'routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from 'components/SnackBar';
import { ITEMS_RADIO_GROUP } from 'constants/items';
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

export default function AddBrandForm() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetBrand, , , axiosFetchGetBrand] = useAxios();
  const [resGetCategory, , , axiosFetchGetCategory] = useAxios();
  const [resGetProvider, , , axiosFetchGetProvider] = useAxios();

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema.products),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === 'imagen' && value !== null) {
        formData.append('imagen', value?.file, value?.file?.name);
      }
      if (key === 'sucursales') {
        formData.append(key, JSON.stringify(value));
      } else formData.append(key, value);
    }

    axiosFetchPost({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/productos`,
      headers: { 'Content-Type': 'multipart/form-data' },
      requestConfig: formData
    });
  };

  useEffect(() => {
    if (Array.isArray(resPost) && errorPost) {
      const severity = 'error';

      enqueueSnackbar(errorPost?.message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPost]);

  return (
    <Page title="Nuevo producto">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Nuevo producto
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Agrega un nuevo producto
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del producto *">
              <Grid container wrap="wrap" spacing={2}>
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
                <ProductsSubsidiaries />
                <Controls.Dropzone name="imagen" sx={{ paddingLeft: '1rem' }} />
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          <Navigate to={PATH_MODULES.products.root} replace state={resPost} />
        )}
      </Container>
    </Page>
  );
}

AddBrandForm.propTypes = {
  title: PropTypes.string
};
