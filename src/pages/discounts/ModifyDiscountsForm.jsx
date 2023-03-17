import { useContext, useEffect } from 'react';
import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import useSettings from '~/hooks/useSettings';
import Page from '~/components/Page';
import useAxios from '~/hooks/useAxios';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { Navigate, useParams } from 'react-router';
import { COLUMNS } from '~/constants/dataTable';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import Fieldset from '~/components/forms/Fieldset';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import Controls from '~/components/forms/Control';
import { ITEMS_RADIO_GROUP } from '~/constants/items';
import DataTable from '~/components/dataTable/DataTable';
import { add } from 'date-fns';
import { LoadingButton } from '@mui/lab';
import { Clear, Save } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { PATH_MODULES } from '~/routes/paths';
import DataTableContext from '~/contexts/DataTableContext';
import ProductsDiscounts from './ProductDiscounts';

let COLUMNS_PRODUCTS = [];
const initialForm = {
  nombre: '',
  fechaInicio: new Date(),
  fechaFin: add(new Date(), { days: 1 }),
  estado: '1',
  productos: [],
};

const getSubsidiaryProducts = (subsidiary) => {
  let aux;
  const data = subsidiary.map(({ nombre, Sucursales_Productos: product }) => ({
    [nombre]: product.stock,
  }));

  data.forEach((item) => {
    aux = { ...aux, ...item };
  });

  const columnsSubsidiary = data.map((item) => ({
    field: Object.keys(item).at(0),
    header: Object.keys(item).at(0),
    tipe: '',
  }));

  COLUMNS_PRODUCTS = [...COLUMNS.productsDiscounts, ...columnsSubsidiary];

  return aux;
};

const customDataProducts = ({ data }) => {
  const newData = data.map(({ id, nombre, sucursales, precioVenta }) => ({
    id,
    nombre,
    precioVenta,
    ...getSubsidiaryProducts(sucursales),
  }));

  return { data: newData };
};

export default function ModifyDiscountsForm() {
  const axiosPrivate = useAxiosPrivate();
  const { resetDataRow } = useContext(DataTableContext);
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  const [resGetDiscount, errorGetDiscount, loadingGetDiscount, axiosFetchGetDiscount, , setErrorGetDiscount] =
    useAxios();
  const [resPutDiscount, errorPutDiscount, loadingPutDiscount, axiosFetchPutDiscount, , setErrorPutDiscount] =
    useAxios();
  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios({
    responseCb: customDataProducts,
  });
  const { id } = useParams();

  const methods = useForm({
    resolver: yupResolver(schema.discounts),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  useEffect(() => {
    axiosFetchGetDiscount({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/descuentos/${id}`,
    });
    axiosFetchGetProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos`,
    });
  }, []);

  useEffect(() => {
    if (!Array.isArray(resGetDiscount) && !errorGetDiscount && resGetProducts.length > 0) {
      const keys = Object.keys(initialForm);
      const objectArray = Object.entries(resGetDiscount);

      objectArray.forEach(([key, value]) => {
        if (keys.includes(key) && key !== 'productos') {
          methods.setValue(key, String(value), { shouldValidate: true });
        }
      });
    }
  }, [resGetDiscount, errorGetDiscount, resGetProducts]);

  useEffect(() => {
    const severity = 'error';
    let message = null;

    if (Array.isArray(resPutDiscount) && errorPutDiscount) {
      message = errorPutDiscount?.message;
      setErrorPutDiscount(null);
    }

    if (Array.isArray(resGetDiscount) && errorGetDiscount) {
      message = errorGetDiscount?.message;
      setErrorGetDiscount(null);
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
      });
    }
  }, [errorPutDiscount]);

  const onSubmit = (data) => {
    resetDataRow();
    axiosFetchPutDiscount({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      url: `/api/v1/descuentos/${id}`,
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <Page title="Modificar descuento" sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
        open={loadingGetDiscount || loadingGetProducts}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph>
          Modificar descuento
        </Typography>
        <Typography gutterBottom sx={{ paddingBottom: '2rem' }}>
          Modifica el descuento de productos
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del descuento *">
              <Grid container wrap="wrap" spacing={1}>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="nombre" label="Nombre" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.DatePicker name="fechaInicio" label="fecha de inicio" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.DatePicker name="fechaFin" label="fecha de finalización" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
              </Grid>
              <Grid container spacing={2} direction={{ md: 'row-reverse' }}>
                <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                  <div>
                    <Box sx={{ paddingBottom: 1 }}>
                      <Typography variant="subtitle1" gutterBottom align="center">
                        Lista de productos
                      </Typography>
                    </Box>
                    {!!resGetProducts.length && (
                      <DataTable
                        columns={COLUMNS_PRODUCTS}
                        rows={resGetProducts}
                        loading={loadingGetProducts}
                        error={errorGetProducts}
                        btnActions={{ add: true }}
                        size="small"
                        width="100%"
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                  {!Array.isArray(resGetDiscount) && !!resGetProducts.length && (
                    <ProductsDiscounts data={resGetDiscount.productos} products={resGetProducts} existDataToLoad />
                  )}
                </Grid>
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button
                startIcon={<Clear />}
                variant="outlined"
                color="error"
                LinkComponent={Link}
                to={PATH_MODULES.discounts.root}
              >
                Cancelar
              </Button>
              <LoadingButton
                loading={loadingPutDiscount}
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
        {!loadingPutDiscount && !errorPutDiscount && !Array.isArray(resPutDiscount) && (
          <Navigate to={PATH_MODULES.discounts.root} replace state={resPutDiscount} />
        )}
      </Container>
    </Page>
  );
}
