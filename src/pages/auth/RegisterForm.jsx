import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// material
import { Box, Typography, styled, Grid } from '@mui/material';
import { Page } from '~/components';
import { PATH_MODULES } from '~/routes/paths';
import useAxios from '~/hooks/useAxios';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import axios from '~/apis/apis';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import { useEffect } from 'react';
import Controls from '~/components/forms/Control';
import { LoadingButton } from '@mui/lab';
import { ITEMS_RADIO_GROUP } from '~/constants/items';
import Fieldset from '~/components/forms/Fieldset';
import { Save } from '@mui/icons-material';

const RootStyle = styled(Page)(() => ({
  margin: '9rem 1rem 1rem ',
}));

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resPostUser, errorPostUser, loadingPostUser, axiosFetchPostUser] = useAxios();
  useSnackBarMessage({
    errors: [errorPostUser],
    successes: [resPostUser],
  });

  useEffect(() => {
    if (!location.state?.celular) return navigate(PATH_MODULES.auth.verifyPhoneNumber, { replace: true });
  }, []);

  const initialFormUser = {
    usuario: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nombre: '',
    apellido: '',
    estado: '1',
    direccion: '',
    celular: location?.state?.celular ?? '',
    ciNit: '',
  };

  const methodsRegister = useForm({
    resolver: yupResolver(schema.register),
    defaultValues: initialFormUser,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPostUser({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/clientes`,
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <RootStyle title="Registrarse">
      <Typography variant="h4" gutterBottom align="center">
        Registrate en SURLLANTAS
      </Typography>
      <FormProvider {...methodsRegister}>
        <form autoComplete="off" noValidate onSubmit={methodsRegister.handleSubmit(onSubmit)}>
          {' '}
          <Fieldset title="Datos del cliente">
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
                <Controls.Input type="number" name="celular" label="Celular" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Input name="ciNit" label="CI / NIT" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
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
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', mt: 2 }}>
            <LoadingButton
              loading={loadingPostUser}
              type="submit"
              loadingPosition="start"
              startIcon={<Save />}
              variant="contained"
            >
              Guardar
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
      {!loadingPostUser && !errorPostUser && !Array.isArray(resPostUser) && <Navigate to="/" replace />}
    </RootStyle>
  );
}
