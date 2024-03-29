import PropTypes from 'prop-types';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
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
import { ITEMS_RADIO_GROUP } from '~/constants/items';
import { Link } from 'react-router-dom';
import { formDataAxios } from '~/apis/apis';

const initialForm = {
  nombre: '',
  descripcion: '',
  precioCompra: '',
  precioVenta: '',
  idProv: { nombre: 'Ninguno', id: '0' },
  idCat: { nombre: 'Ninguno', id: '0' },
  idMarca: { nombre: 'Ninguno', id: '0' },
  sucursales: [],
  imagen: null,
  estado: '1',
  stockMin: '5',
};

const getOnlyActiveDatas = ({ data }) => {
  const newData = data.filter(({ estado }) => estado === 1);
  return { data: newData };
};

export default function AddProductsForm() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetBrand, , , axiosFetchGetBrand] = useAxios({ responseCb: getOnlyActiveDatas });
  const [resGetCategory, , , axiosFetchGetCategory] = useAxios({ responseCb: getOnlyActiveDatas });
  const [resGetProvider, , , axiosFetchGetProvider] = useAxios({ responseCb: getOnlyActiveDatas });

  useEffect(() => {
    axiosFetchGetBrand({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/marcas`,
    });
    axiosFetchGetCategory({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/categorias`,
    });
    axiosFetchGetProvider({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/proveedores`,
    });
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema.products),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    const newData = Object.entries(data).map(([key, value]) => {
      if (key === 'imagen' && value !== null) return [key, value];
      if (typeof value === 'object' && value !== null) {
        return [key, value.id];
      }
      return [key, value];
    });

    newData.forEach(([key, value]) => {
      if (key === 'imagen' && value !== null) {
        formData.append('imagen', value?.file, value?.file?.name);
        return;
      }

      if (key === 'sucursales') {
        formData.append(key, JSON.stringify(value));
      } else formData.append(key, value);
    });

    axiosFetchPost({
      axiosInstance: formDataAxios,
      method: 'POST',
      url: `/api/v1/productos`,
      requestConfig: formData,
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
                  <Controls.Autocomplete name="idProv" label="Proveedor" items={resGetProvider} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Autocomplete name="idMarca" label="Marca" items={resGetBrand} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Autocomplete name="idCat" label="Categoria" items={resGetCategory} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input
                    name="stockMin"
                    label="cantidad minima del producto"
                    helperText="cantidad minima de las existencias del producto para notificar"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
                <Grid item xs={12}>
                  <Controls.Input
                    name="descripcion"
                    label="Descripción"
                    multiline
                    rows={4}
                    helperText="*Se visualizara en la descripción del producto de la tienda"
                  />
                </Grid>
                {/* <ProductsSubsidiaries /> */}
                <Grid item>* se recomienda imagenes cuadradas</Grid>
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

AddProductsForm.propTypes = {
  title: PropTypes.string,
};
