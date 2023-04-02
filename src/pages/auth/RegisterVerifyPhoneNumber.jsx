import { Navigate, Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Stack, Link, Alert, Typography, styled } from '@mui/material';
import { Page } from '~/components';
import { PATH_MODULES } from '~/routes/paths';
import { MHidden } from '~/components/@material-extend';
import useAxios from '~/hooks/useAxios';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import axios from '~/apis/apis';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
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

const STATES_RESGISTER = {
  INITIAL: 0,
  EXIST_PHONE_NUMBER: 1,
  REGISTER: 2,
};

export default function Register() {
  const [resPostPhoneNumber, errorPostPhoneNumber, loadingPostPhoneNumber, axiosFetchPostPhoneNumber] = useAxios({
    intervalClearError: 10 * 1000,
  });
  const [existPhoneNumer, setExistPhoneNumer] = useState(STATES_RESGISTER.INITIAL);
  useSnackBarMessage({
    errors: [errorPostPhoneNumber],
  });

  useEffect(() => {
    if (Array.isArray(resPostPhoneNumber)) return;
    setExistPhoneNumer(() => {
      if (resPostPhoneNumber?.message) return STATES_RESGISTER.REGISTER;
      if (resPostPhoneNumber?.celular) return STATES_RESGISTER.EXIST_PHONE_NUMBER;
      return STATES_RESGISTER.INITIAL;
    });
  }, [resPostPhoneNumber]);

  const methods = useForm({
    resolver: yupResolver(schema.phoneNumber),
    defaultValues: initialFormPhone,
    mode: 'all',
    criteriaMode: 'all',
  });
  const phoneNumber = methods.watch('celular');

  const onSubmit = (data) => {
    axiosFetchPostPhoneNumber({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/auth/verificar-telefono`,
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <RootStyle title="Registrarse">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 5 }} align="center">
            Regístrate ahora para acceder a nuestra amplia selección de repuestos automotrices y ofertas
          </Typography>
          <img src="/static/illustrations/illustration_register.png" alt="register" />
        </SectionStyle>
      </MHidden>
      <ContentStyle
        sx={{
          mx: { xs: 'auto', md: '0' },
          mt: { xs: 7, md: 0 },
          px: { xs: 2 },
          ...(existPhoneNumer ? { maxWidth: '100%' } : {}),
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom align="center">
              Registrate en Llanta sur
            </Typography>
          </Box>
        </Stack>

        {Array.isArray(resPostPhoneNumber) && !errorPostPhoneNumber && existPhoneNumer === STATES_RESGISTER.INITIAL && (
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
        )}
        {existPhoneNumer === STATES_RESGISTER.EXIST_PHONE_NUMBER && (
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
      {!loadingPostPhoneNumber && !errorPostPhoneNumber && !Array.isArray(resPostPhoneNumber) && (
        <Navigate to={PATH_MODULES.auth.signUp} replace state={{ celular: phoneNumber }} />
      )}
    </RootStyle>
  );
}
