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
import { Navigate } from 'react-router';
import { PATH_MODULES } from '~/routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import { Link } from 'react-router-dom';

const initialForm = {
  nombre: '',
  numDoc: '',
  actividadEco: '',
  leyenda: '',
  email: '',
  tel: '',
  direccion: '',
  ciudad: '',
};

export default function BusinessDataForm() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPut, errorPut, loadingPut, axiosFetchPut, , setErrorPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();

  const methods = useForm({
    resolver: yupResolver(schema.businessData),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPut({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      url: `/api/v1/datos-negocio`,
      requestConfig: {
        ...data,
      },
    });
  };

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/datos-negocio`,
    });
  }, []);

  useEffect(() => {
    if (!Array.isArray(resGet) && !errorGet) {
      const keys = Object.keys(initialForm);
      const objectArray = Object.entries(resGet);

      objectArray.forEach(([key, value]) => {
        if (keys.includes(key)) {
          methods.setValue(key, String(value), { shouldValidate: true });
        }
      });
    }
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
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
      });
    }
  }, [errorPut, errorGet]);

  return (
    <Page title="Datos del negocio">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Datos del negocio
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Actualiza la información del negocio
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del negocio *">
              <Grid container wrap="wrap" spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="nombre" label="Nombre" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="numDoc" label="Número de documento NIT" type="number" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="actividadEco" label="Actividad Economica" multiline />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controls.Input name="email" label="Email" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="tel" label="Teléfono" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="direccion" label="Dirección" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="ciudad" label="Ciudad" />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controls.Input name="leyenda" label="leyenda" multiline />
                </Grid>
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button startIcon={<Clear />} variant="outlined" color="error" LinkComponent={Link} to={PATH_MODULES.app}>
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
          <Navigate to={PATH_MODULES.app} replace state={resPut} />
        )}
      </Container>
    </Page>
  );
}

BusinessDataForm.propTypes = {
  title: PropTypes.string,
};
