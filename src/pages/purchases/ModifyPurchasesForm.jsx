import { useEffect } from 'react';
import { Backdrop, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import useSettings from '~/hooks/useSettings';
import Page from '~/components/Page';
import useAxios from '~/hooks/useAxios';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { Navigate, useLocation } from 'react-router';
import { TABLE_STATES } from '~/constants/dataTable';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import Fieldset from '~/components/forms/Fieldset';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import { PATH_MODULES } from '~/routes/paths';
import { Clear, Save } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { DefectivesProductsHistory } from '~/components';
// import DefectiveProductsSell from './DefectiveProductsSell';

const { paymentMethods, salesTypes } = TABLE_STATES;

const idSucursalBorrar = '678197a0-69a8-4c24-89a5-bf13873cc08b';

const initialForm = {
  data: [],
};

const currentSubsidiaryStock = (idSuc, subsidiaries) => {
  const value = subsidiaries?.find((subsidiary) => subsidiary.id === idSuc);

  return value ? value.SucursalesProductos.stock : '0';
};

const salesCustomData = ({ data }) => {
  const newData = data.detalle.map((item) => ({
    ...item,
    stock: currentSubsidiaryStock(idSucursalBorrar, item.producto.sucursales),
  }));
  return { data: { ...data, detalle: newData } };
};

export default function ModifySell() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [resGetSale, errorGetSale, loadingGetSale, axiosFetchGetSale, , setErrorGetSale] = useAxios({
    responseCb: salesCustomData,
  });
  const [
    resGetDefectiveProducts,
    errorGetDefectiveProducts,
    loadingGetDefectiveProducts,
    axiosFetchGetDefectiveProducts,
    ,
    setErrorGetDefectiveProducts,
  ] = useAxios();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

  const methods = useForm({
    resolver: yupResolver(schema.defectiveProducts),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const id = location.pathname.split('/').pop();

  useEffect(() => {
    axiosFetchGetSale({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/ventas/${id}`,
    });
    axiosFetchGetDefectiveProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos-defectuosos/ventas/${id}`,
    });
  }, []);

  useEffect(() => {
    const severity = 'error';
    let message = null;

    if (Array.isArray(resGetSale) && errorGetSale) {
      message = errorGetSale?.message;
      setErrorGetSale(null);
    }
    if (Array.isArray(resGetDefectiveProducts) && errorGetDefectiveProducts) {
      message = errorGetDefectiveProducts?.message;
      setErrorGetDefectiveProducts(null);
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
      });
    }
  }, [errorGetSale]);

  const onSubmit = ({ data }) => {
    const filteredData = data
      .map((value) => ({ ...value, idSuc: idSucursalBorrar }))
      .filter(({ cantidad }) => cantidad > 0);

    axiosFetchPost({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/productos-defectuosos`,
      requestConfig: {
        data: filteredData,
      },
    });
  };

  return (
    <Page title="Modificar venta" sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
        open={loadingGetSale || loadingGetDefectiveProducts}
      >
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
        <Fieldset title="Datos de la venta" style={{ marginBottom: '2rem' }}>
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
              {/* {!Array.isArray(resGetSale) && !errorGetSale && <DefectiveProductsSell data={resGetSale?.detalle} />} */}
              <Stack flexDirection="row" gap={2} justifyContent="center">
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
              </Stack>
            </form>
          </FormProvider>
        </Fieldset>
        <DefectivesProductsHistory data={resGetDefectiveProducts} />

        {!loadingPost && !errorPost && !Array.isArray(resPost) && (
          <Navigate to={PATH_MODULES.sells.root} replace state={resPost} />
        )}
      </Container>
    </Page>
  );
}
