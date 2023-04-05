import PropTypes from 'prop-types';
import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
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
import { Navigate, useLocation } from 'react-router';
import { PATH_MODULES } from '~/routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import { ITEMS_RADIO_GROUP } from '~/constants/items';
import { Link } from 'react-router-dom';
import ProductsSubsidiaries from './ProductsSubsidiaries';

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

const stockOtherSubsidiary = (subsidiaries) =>
  subsidiaries.map((subsidiary) => ({
    idSuc: subsidiary.id,
    nombre: subsidiary.nombre,
    stock: subsidiary.Sucursales_Productos.stock,
  }));

const customData = ({ data }) => {
  const { marca, proveedor, categoria, ...otherData } = data;
  return {
    data: {
      ...otherData,
      idMarca: { id: marca.id, nombre: marca.nombre },
      idCat: { id: categoria.id, nombre: categoria.nombre },
      idProv: { id: proveedor.id, nombre: proveedor.nombre },
      sucursales: stockOtherSubsidiary(data.sucursales),
    },
  };
};

const getOnlyActiveDatas = ({ data }) => {
  const newData = data.filter(({ estado }) => estado === 1);
  return { data: newData };
};

export default function ModifyProductForm() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [resPut, errorPut, loadingPut, axiosFetchPut, , setErrorPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios({ responseCb: customData });
  const [resGetBrand, , loadingGetBrand, axiosFetchGetBrand] = useAxios({ responseCb: getOnlyActiveDatas });
  const [resGetCategory, , loadingGetCategory, axiosFetchGetCategory] = useAxios({ responseCb: getOnlyActiveDatas });
  const [resGetProvider, , loadingGetProvider, axiosFetchGetProvider] = useAxios({ responseCb: getOnlyActiveDatas });

  const id = location.pathname.split('/').pop();

  const methods = useForm({
    resolver: yupResolver(schema.products),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return [key, value.id];
        }
        return [key, value];
      })
      .forEach(([key, value]) => {
        if (key === 'imagen' && value?.file instanceof File) {
          formData.append('imagen', value?.file, value?.file?.name);
        }
        if (key === 'sucursales') {
          formData.append(key, JSON.stringify(value));
        } else formData.append(key, value);
      });
    axiosFetchPut({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      url: `/api/v1/productos/${id}`,
      headers: { 'Content-Type': 'multipart/form-data' },
      requestConfig: formData,
    });
  };

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
    axiosFetchGet({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos/${id}`,
    });
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
        if (keys.includes(key) && typeof value === 'object') {
          methods.setValue(key, value, { shouldValidate: true });
          return;
        }

        if (keys.includes(key) && key !== 'sucursales') {
          methods.setValue(key, String(value), { shouldValidate: true });
        }
      });
    }
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
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
      });
    }
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
                  <Controls.Autocomplete
                    name="idProv"
                    label="Proveedor"
                    items={resGetProvider}
                    loading={loadingGetProvider}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Autocomplete name="idMarca" label="Marca" items={resGetBrand} loading={loadingGetBrand} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Autocomplete
                    name="idCat"
                    label="Categoria"
                    items={resGetCategory}
                    loading={loadingGetCategory}
                  />
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
  title: PropTypes.string,
};
