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

const initialForm = {
  fecha: new Date().toLocaleDateString(),
  idCliente: '0',
  idVendedor: 'a5f92b6e-77c0-4522-89d5-53ec8c141e76',
  idSucursal: '678197a0-69a8-4c24-89a5-bf13873cc08b',
  productos: [{ idProd: '', cantidad: '0' }]
};

export default function AddSellsForm() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios();
  const [resGetCustomers, , loadingGetCustomers, axiosFetchGetCustomers] = useAxios();

  useEffect(() => {
    axiosFetchGetCustomers({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/clientes`
    });
    axiosFetchGetProducts({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/productos`
    });
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema.sells({ initialCustomer: '0' })),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });
  console.log(methods.watch());
  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/ventas`,
      requestConfig: {
        ...data
      }
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
    <Page title="Nueva venta">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                <Controls.Input name="fecha" label="Fecha" disabled />
                <Controls.Input name="idVendedor" label="Vendedor" disabled />
                <Controls.Input name="idSucursal" label="Sucursal" disabled />
                <Controls.Autocomplete
                  name="idCliente"
                  label="Cliente"
                  items={resGetCustomers}
                  loading={loadingGetCustomers}
                />
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
          <Navigate to={PATH_MODULES.subsidiaries.root} replace state={resPost} />
        )}
      </Container>
    </Page>
  );
}

AddSellsForm.propTypes = {
  title: PropTypes.string
};
