import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Stack, Link, Alert, Typography, styled, TextField } from '@mui/material';
import { Page } from '~/components';
import { PATH_MODULES } from '~/routes/paths';
import { MHidden } from '~/components/@material-extend';
import LoginForm from '~/components/auth/LoginForm';
import useAxios from '~/hooks/useAxios';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import axios from '~/apis/apis';
import useErrorMessage from '~/hooks/useErrorMessage';
import { useState, useEffect } from 'react';
import Controls from '~/components/forms/Control';
import { LoadingButton } from '@mui/lab';

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

const initialFormPhone = {
  celular: '',
};

const initialFormUser = {
  usuario: '',
  email: '',
  password: '',
  nombre: '',
  apellido: '',
  estado: '1',
  direccion: '',
  celular: '',
  ciNit: '',
};

export default function Register() {
  const [resPostPhoneNumber, errorPostPhoneNumber, loadingPostPhoneNumber, axiosFetchPostPhoneNumber] = useAxios({
    intervalClearError: 10 * 1000,
  });
  const [resPostUser, errorPostUser, loadingPostUser, axiosFetchPostUser] = useAxios();
  const [existPhoneNumer, setExistPhoneNumer] = useState(false);

  useErrorMessage({
    errors: [errorPostPhoneNumber],
  });

  useEffect(() => {
    if (!Array.isArray(resPostPhoneNumber)) {
      setExistPhoneNumer(true);
    }
  }, [resPostPhoneNumber]);

  const methods = useForm({
    resolver: yupResolver(existPhoneNumer ? schema.login : schema.phoneNumber),
    defaultValues: existPhoneNumer ? initialFormUser : initialFormPhone,
    mode: 'all',
    criteriaMode: 'all',
  });

  console.log(methods.watch());

  const onSubmit = (data) => {
    axiosFetchPostPhoneNumber({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/usuarios/verificar-telefono`,
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }} align="center">
            Regístrate ahora para acceder a nuestra amplia selección de repuestos automotrices y ofertas
          </Typography>
          <img src="/static/illustrations/illustration_register.png" alt="register" />
        </SectionStyle>
      </MHidden>
      <ContentStyle sx={{ mx: { xs: 'auto', md: '0' }, mt: { xs: 7, md: 0 }, px: { xs: 2 } }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Registrate en Llanta sur
            </Typography>
          </Box>
        </Stack>

        {Array.isArray(resPostPhoneNumber) && !errorPostPhoneNumber ? (
          <Stack>
            <Alert severity="info" sx={{ mb: 3 }}>
              ingresa tu número celular para verificar que no existes en nuestros registros
            </Alert>
            <FormProvider {...methods}>
              <form autoComplete="off" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                <Controls.Input name="celular" label="Celular" />
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loadingPostPhoneNumber}
                >
                  Verificar
                </LoadingButton>
              </form>
            </FormProvider>
          </Stack>
        ) : (
          <FormProvider {...methods}>
            <form autoComplete="off" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
              <LoginForm methods={methods} loading={loadingPostUser} />
            </form>
          </FormProvider>
        )}

        {Array.isArray(resPostPhoneNumber) && !errorPostPhoneNumber && (
          <Stack gap={2}>
            <Alert severity="info" sx={{ mb: 3 }}>
              EL número ingresado ya existe en nuestros registros, si no recuerda su contraseña puede recuperarlo en el
              siguiente enlace abajo
            </Alert>
            <Link component={RouterLink} variant="subtitle2" to={PATH_MODULES.auth.resetPassword}>
              ¿Ólvido su contraseña?
            </Link>
          </Stack>
        )}
      </ContentStyle>
    </RootStyle>
  );
}
