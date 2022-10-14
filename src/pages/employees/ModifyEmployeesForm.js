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
import { Navigate, useLocation } from 'react-router';
import { PATH_MODULES } from 'routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from 'components/SnackBar';
import { ITEMS_RADIO_GROUP, ITEMS_SELECTS } from 'constants/items';

const initialForm = {
  usuario: '',
  email: '',
  password: '',
  nombre: '',
  foto: '',
  apellido: '',
  estado: '1',
  direccion: '',
  celular: '',
  ciNit: '',
  idSuc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
  roles: [ITEMS_SELECTS[1].idRol]
};

const customData = ({ data }) => {
  const ROLES = ITEMS_SELECTS.map((rol) => rol.idRol);

  const roles = data.roles.map((rol) => rol.idRol).filter((item) => ROLES.includes(item));

  return { data: { ...data, roles } };
};

export default function ModifyEmployeesForm() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [resPut, errorPut, loadingPut, axiosFetchPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(customData);

  const id = location.pathname.split('/').pop();

  const methods = useForm({
    resolver: yupResolver(schema.customer),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    axiosFetchPut({
      axiosInstance: axios,
      method: 'PUT',
      url: `/api/v1/empleados/${id}`,
      requestConfig: {
        ...data
      }
    });
  };

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/empleados/${id}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Array.isArray(resGet) && !errorGet) {
      const keys = Object.keys(initialForm);
      const objectArray = Object.entries(resGet);

      for (const [key, value] of objectArray) {
        if (keys.includes(key)) {
          methods.setValue(key, key !== 'roles' ? String(value ?? '') : value, { shouldValidate: true });
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
    <Page title="modificar empleado">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Modificar empleado
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Modifica un empleado existente
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
                <Grid item xs={12} md={6}>
                  <Controls.SelectChip name="roles" label="Roles" items={ITEMS_SELECTS} />
                </Grid>
              </Grid>
            </Fieldset>
            <Fieldset title="Datos del usuario">
              <Grid container wrap="wrap" spacing={1}>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="usuario" label="Usuario" placeholder="Por defecto es el CI / NIT" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="email" type="email" label="Email" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input
                    type="password"
                    name="password"
                    label="Contraseña"
                    placeholder="Por defecto es el numero de celular"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input
                    name="passwordConfirmation"
                    type="password"
                    label="Repetir contraseña"
                    placeholder="Por defecto es el numero de celular"
                  />
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
          <Navigate to={PATH_MODULES.employees.root} replace state={resPut} />
        )}
      </Container>
    </Page>
  );
}

ModifyEmployeesForm.propTypes = {
  title: PropTypes.string
};
