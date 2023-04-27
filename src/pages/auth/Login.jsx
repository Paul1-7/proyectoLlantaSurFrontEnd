import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import { Box, Card, Stack, Link, Alert, Typography, styled } from '@mui/material';
import { Page } from '~/components';
import { PATH_MODULES } from '~/routes/paths';
import { MHidden } from '~/components/@material-extend';
import LoginForm from '~/components/auth/LoginForm';
import useAuth from '~/hooks/useAuth';
import useAxios from '~/hooks/useAxios';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import axios from '~/apis/apis';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import { useEffect } from 'react';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    marginTop: '9rem',
    justifyContent: 'space-around',
    gap: '1rem',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center',

  padding: theme.spacing(12, 0),
}));

const customErrorMessages = (err, setError) => {
  if (!err?.response) {
    setError({ message: 'No hay respuesta del servidor' });
  } else if (err.response?.status === 400) {
    setError({ message: 'No se encuentra el usuario o contraseña' });
  } else if (err.response?.status === 401) {
    setError({ message: 'No estas autorizado' });
  } else {
    setError({ message: 'Falló el inicio de sesión' });
  }
};

const initialForm = {
  usuario: '',
  password: '',
};

export default function Login() {
  const { setAuthToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios({
    customErrorMessages,
  });

  useSnackBarMessage({
    errors: [errorPost],
  });

  const methods = useForm({
    resolver: yupResolver(schema.login),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/auth/login`,
      requestConfig: {
        ...data,
      },
    });
  };

  useEffect(() => {
    if (Array.isArray(resPost)) return;
    setAuthToken(resPost);
    navigate(from, { replace: true });
  }, [resPost]);

  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hola, bienvenido de vuelta
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>
      <ContentStyle sx={{ mx: { xs: 'auto', md: '0' }, mt: { xs: 7, md: 0 }, px: { xs: 2 } }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Inicia sesión en SURLLANTAS
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Ingresa tus credenciales abajo.</Typography>
          </Box>
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          si realizaste una compra en la tienda física, tu usuario es tu CI/NIT con el cual realizaste la compra, y la
          contraseña es el número de télefono
        </Alert>
        <Alert severity="info" sx={{ mb: 3 }}>
          User: admin <br /> Password: admin
        </Alert>
        <FormProvider {...methods}>
          <form autoComplete="off" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
            <LoginForm methods={methods} loading={loadingPost} />
          </form>
        </FormProvider>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          ¿No tienes una cuenta?&nbsp;
          <Link variant="subtitle2" component={RouterLink} to={PATH_MODULES.auth.signUp}>
            Registrate aquí
          </Link>
        </Typography>
      </ContentStyle>
    </RootStyle>
  );
}
