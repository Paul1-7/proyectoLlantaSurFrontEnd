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
import { useContext, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import DataTable from '~/components/dataTable/DataTable';
import { COLUMNS } from '~/constants/dataTable';
import DataTableContext, { DataTableProvider } from '~/contexts/DataTableContext';
import { Link } from 'react-router-dom';
import { add } from 'date-fns';
import { ITEMS_RADIO_GROUP } from '~/constants/items';
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
  const newData = data
    .filter(({ estado }) => estado === 1)
    .map(({ id, nombre, sucursales, precioVenta }) => ({
      id,
      nombre,
      precioVenta,
      ...getSubsidiaryProducts(sucursales),
    }));

  return { data: newData };
};

const btnActions = { add: true };

export default function AddDiscountsForm() {
  const axiosPrivate = useAxiosPrivate();
  const { resetDataRow } = useContext(DataTableContext);
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios({
    responseCb: customDataProducts,
  });

  useEffect(() => {
    axiosFetchGetProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos`,
    });
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema.discounts),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    resetDataRow();
    axiosFetchPost({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/descuentos`,
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
            Nuevo descuento
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Agrega un nuevo descuento
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
                          btnActions={btnActions}
                          size="small"
                          width="100%"
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ marginTop: '16px' }}>
                    <ProductsDiscounts />
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
            <Navigate to={PATH_MODULES.discounts.root} replace state={resPost} />
          )}
        </Container>
      </DataTableProvider>
    </Page>
  );
}

AddDiscountsForm.propTypes = {
  title: PropTypes.string,
};
