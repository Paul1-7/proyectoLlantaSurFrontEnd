import { Navigate, useParams } from 'react-router-dom';
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
import Controls from '~/components/forms/Control';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

const RootStyle = styled(Page)(() => ({
  margin: '9rem 1rem 1rem ',
}));

export default function RecoveryPasswordEmail() {
  const { userId, token } = useParams();
  const [resPostUser, errorPostUser, loadingPostUser, axiosFetchPostUser] = useAxios();
  useSnackBarMessage({
    errors: [errorPostUser],
    successes: [resPostUser],
  });

  const initialFormUser = {
    password: '',
    passwordConfirmation: '',
  };

  const methodsRegister = useForm({
    resolver: yupResolver(schema.recoveryPasswordForm),
    defaultValues: initialFormUser,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPostUser({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/recuperar-password/${userId}/${token}`,
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <RootStyle title="Registrarse">
      <Typography variant="h4" sx={{ mb: 4 }} align="center">
        Recupera tu contraseña
      </Typography>
      <FormProvider {...methodsRegister}>
        <form autoComplete="off" noValidate onSubmit={methodsRegister.handleSubmit(onSubmit)}>
          <Grid container spacing={1} flexDirection="column" alignItems="center">
            <Controls.Input name="password" label="Nueva contraseña" type="password" sx={{ maxWidth: '22rem' }} />
            <Controls.Input
              name="passwordConfirmation"
              label="Confirmar contraseña"
              type="password"
              sx={{ maxWidth: '22rem' }}
            />
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', mt: 2 }}>
            <LoadingButton
              loading={loadingPostUser}
              type="submit"
              loadingPosition="start"
              startIcon={<Save />}
              variant="contained"
            >
              Actualizar contraseña
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
      {!loadingPostUser && !errorPostUser && !Array.isArray(resPostUser) && (
        <Navigate to={PATH_MODULES.auth.signIn} replace />
      )}
    </RootStyle>
  );
}
