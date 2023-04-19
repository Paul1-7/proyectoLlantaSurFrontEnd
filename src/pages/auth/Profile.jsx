import { Link, useLocation } from 'react-router-dom';
// material
import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Typography, styled } from '@mui/material';
import { Avatar, Page } from '~/components';
import useAuth from '~/hooks/useAuth';
import useAxios from '~/hooks/useAxios';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import { useEffect } from 'react';
import Controls from '~/components/forms/Control';
import { Clear, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '1rem',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 720,
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center',

  padding: theme.spacing(12, 0),
}));

const initialForm = {
  usuario: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  nombre: '',
  apellido: '',
  direccion: '',
  celular: '',
  ciNit: '',
  estado: '',
};

export default function Login() {
  const { auth } = useAuth();
  const { nombre, apellido, idUsuario } = auth?.user ?? {};
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [resPut, errorPut, loadingPut, axiosFetchPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();

  useSnackBarMessage({
    errors: [errorPut, errorGet],
    successes: [resPut],
  });

  const methods = useForm({
    resolver: yupResolver(schema.profile),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPut({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      url: `/api/v1/clientes/${idUsuario}`,
      requestConfig: {
        ...data,
      },
    });
  };

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
        methods.setValue(key, String(value), { shouldValidate: true });
      });
    }
  }, [resGet]);

  useEffect(() => {
    if (!auth?.user) return;
    axiosFetchGet({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/clientes/${auth.user.idUsuario}`,
    });
  }, [auth]);

  return (
    <RootStyle title="Perfil de usuario">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ContentStyle sx={{ mx: { xs: 'auto', md: '0' }, mt: { xs: 7, md: 0 }, px: { xs: 2 } }}>
        <Typography variant="h3" gutterBottom>
          Perfil de usuario
        </Typography>
        <Alert severity="info" sx={{ mb: 3 }}>
          los cambios se verán reflejados despues de que vuelva a iniciar sesión
        </Alert>
        <Alert severity="info" sx={{ mb: 3 }}>
          Si necesitas modificar algunos de los campos desabilitados, nececitaras acercarte a cualqueria de nuestras
          tiendas
        </Alert>
        <Typography variant="h5" width="100%" sx={{ mb: 4 }}>
          Datos de la persona
        </Typography>
        <Avatar name={`${nombre} ${apellido}`} sx={{ width: 80, height: 80, fontSize: '2.5rem', mb: 2 }} />
        <FormProvider {...methods}>
          <form autoComplete="off" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
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
                <Controls.Input name="ciNit" label="CI / NIT" disabled />
              </Grid>
              <Typography variant="h5" gutterBottom width="100%">
                Datos del usuario
              </Typography>
              <Grid item xs={12} md={6}>
                <Controls.Input name="email" type="email" label="Email" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Input name="usuario" label="Usuario" />
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
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button startIcon={<Clear />} variant="outlined" color="error" LinkComponent={Link} to={from}>
                Cancelar
              </Button>
              <LoadingButton
                loading={loadingPut}
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
      </ContentStyle>
    </RootStyle>
  );
}
