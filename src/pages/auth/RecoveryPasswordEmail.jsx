// material
import { Box, Typography, styled, Alert, Container } from '@mui/material';
import { Page } from '~/components';
import useAxios from '~/hooks/useAxios';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import axios from '~/apis/apis';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import Controls from '~/components/forms/Control';
import { LoadingButton } from '@mui/lab';
import { Email } from '@mui/icons-material';

const RootStyle = styled(Page)(() => ({
  margin: '9rem 1rem 1rem ',
}));

export default function RecoveryPasswordEmail() {
  const [resPostEmail, errorPostEmail, loadingPostEmail, axiosFetchPostUser] = useAxios();
  useSnackBarMessage({
    errors: [errorPostEmail],
    successes: [resPostEmail],
  });

  const initialForm = {
    email: '',
  };

  const methodsRegister = useForm({
    resolver: yupResolver(schema.recoveryPasswordEmail),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPostUser({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/auth/recuperar-password`,
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <RootStyle title="Registrarse">
      <Typography variant="h4" gutterBottom align="center">
        Recupera tu contraseña
      </Typography>
      <Container maxWidth="sm">
        <Alert severity="info" sx={{ mb: 3 }}>
          si tienes una cuenta pero no definiste tu correo electronico, puedes acudir a cualquiera de nuestras tiendas y
          solicitar que te ayuden a restablecerla.
        </Alert>
        <FormProvider {...methodsRegister}>
          <form autoComplete="off" noValidate onSubmit={methodsRegister.handleSubmit(onSubmit)}>
            <Controls.Input name="email" label="Email" size="normal" />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', my: 2 }}>
              <LoadingButton
                loading={loadingPostEmail}
                type="submit"
                loadingPosition="start"
                startIcon={<Email />}
                variant="contained"
              >
                Enviar correo de recuperacion
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
      </Container>
    </RootStyle>
  );
}
