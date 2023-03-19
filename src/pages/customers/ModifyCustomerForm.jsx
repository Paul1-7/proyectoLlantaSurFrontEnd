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
import useAuth from '~/hooks/useAuth';

const initialForm = {
  usuario: '',
  email: '',
  password: '0',
  passwordConfirmation: '',
  nombre: '',
  foto: '',
  apellido: '',
  estado: '1',
  direccion: '',
  celular: '',
  ciNit: '',
  idSuc: '',
};

export default function ModifyCustomerForm() {
  const { auth } = useAuth();
  const { id: idSuc, nombre: nombreSuc } = auth?.user?.sucursal ?? {};
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [resPut, errorPut, loadingPut, axiosFetchPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();

  const id = location.pathname.split('/').pop();

  const methods = useForm({
    resolver: yupResolver(schema.customer),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    const newData = {
      ...data,
      idSuc,
    };
    axiosFetchPut({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      url: `/api/v1/clientes/${id}`,
      requestConfig: {
        ...newData,
      },
    });
  };

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/clientes/${id}`,
    });
  }, []);

  useEffect(() => {
    if (!Array.isArray(resGet) && !errorGet) {
      const keys = Object.keys(initialForm);
      const objectArray = Object.entries(resGet);

      objectArray.forEach(([key, value]) => {
        if (!keys.includes(key)) {
          return;
        }

        if (value === null) {
          methods.setValue(key, String(''), { shouldValidate: true });
          return;
        }

        if (value === idSuc) {
          methods.setValue(key, String(nombreSuc), { shouldValidate: true });
          return;
        }

        methods.setValue(key, String(value), { shouldValidate: true });
      });
    }
  }, [resGet]);

  useEffect(() => {
    const severity = 'error';
    let message = null;

    if (Array.isArray(resPut) && errorPut) {
      message = errorPut?.message;
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
    <Page title="modificar cliente">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Modificar cliente
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Modifica un cliente existente
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del cliente *">
              <Grid container wrap="wrap" spacing={1}>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="nombre" label="Nombre" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="apellido" label="Apellido" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="direccion" label="Direccion" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input type="number" name="celular" label="Celular" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="ciNit" label="CI / NIT" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="idSuc" label="Sucursal" disabled />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
              </Grid>
            </Fieldset>
            <Fieldset title="Datos del usuario">
              <Grid container wrap="wrap" spacing={1}>
                <Grid item xs={12} md={6}>
                  <Controls.Input
                    name="usuario"
                    label="Usuario"
                    placeholder="Por defecto es el CI / NIT"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="email" type="email" label="Email" autoComplete="off" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input
                    type="password"
                    name="password"
                    label="Contraseña"
                    placeholder="Por defecto es el numero de celular"
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input
                    autoComplete="off"
                    name="passwordConfirmation"
                    type="password"
                    label="Repetir contraseña"
                    placeholder="Por defecto es el numero de celular"
                  />
                </Grid>
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button
                startIcon={<Clear />}
                variant="outlined"
                color="error"
                LinkComponent={Link}
                to={PATH_MODULES.customers.root}
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
          <Navigate to={PATH_MODULES.customers.root} replace state={resPut} />
        )}
      </Container>
    </Page>
  );
}

ModifyCustomerForm.propTypes = {
  title: PropTypes.string,
};
