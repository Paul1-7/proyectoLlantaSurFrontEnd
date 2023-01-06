import PropTypes from 'prop-types';
import { Backdrop, Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
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
  numAutorizacion: '',
  numFactInicial: '',
  llaveDosificacion: '',
  fechaLimEmision: new Date()
};

export default function InvoiceBatchingForm() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPut, errorPut, loadingPut, axiosFetchPut, , setErrorPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();

  const methods = useForm({
    resolver: yupResolver(schema.invoiceBatching),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    axiosFetchPut({
      axiosInstance: axios,
      method: 'PUT',
      url: `/api/v1/dosificacion-facturas`,
      requestConfig: {
        ...data
      }
    });
  };

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/dosificacion-facturas`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Array.isArray(resGet) && !errorGet) {
      const keys = Object.keys(initialForm);
      const objectArray = Object.entries(resGet);

      for (const [key, value] of objectArray) {
        if (keys.includes(key)) {
          methods.setValue(key, String(value), { shouldValidate: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resGet]);

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
    <Page title="Dosificación de facturas">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Dosificación de facturas
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Actualiza la dosificación de facturas del sistema
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos de la dosificación de facturas *">
              <Grid container wrap="wrap" spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="numAutorizacion" label="Número de autorización" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input
                    name="numFactInicial"
                    label="Número de factura inicial"
                    type="number"
                    helperText="la factura comenzara a partir de este numero"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="llaveDosificacion" label="Llave de dosificación" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.DatePicker name="fechaLimEmision" label="Fecha limite de emisión" />
                </Grid>
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
          <Navigate to={PATH_MODULES.app} replace state={resPut} />
        )}
      </Container>
    </Page>
  );
}

InvoiceBatchingForm.propTypes = {
  title: PropTypes.string
};
