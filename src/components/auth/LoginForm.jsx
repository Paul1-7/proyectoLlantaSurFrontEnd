import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment, Link, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import schema from '~/schemas';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_MODULES } from '~/routes/paths';
import { LoadingButton } from '@mui/lab';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import Controls from '../forms/Control';

const onSubmit = (data) => {
  data.fecha = new Date();
  data.idCliente = data.idCliente.idCliente;
  // axiosFetchPost({
  //   axiosInstance: axios,
  //   method: 'POST',
  //   url: `/api/v1/ventas`,
  //   requestConfig: {
  //     ...data,
  //   },
  // });
};

const initialForm = {
  usuario: '',
  password: '',
};

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema.login),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    data.fecha = new Date();
    data.idCliente = data.idCliente.idCliente;
    // axiosFetchPost({
    //   axiosInstance: axios,
    //   method: 'POST',
    //   url: `/api/v1/ventas`,
    //   requestConfig: {
    //     ...data,
    //   },
    // });
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controls.Input type="email" label="Ingrese su email o usuario" name="usuario" size="medium" />
          <Controller
            name="password"
            control={methods.control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                size="medium"
                value={field.value}
                onChange={field.onChange}
                error={false}
                helperText={' '}
                fullWidth
              />
            )}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Link component={RouterLink} variant="subtitle2" to={PATH_MODULES.auth.resetPassword}>
            ¿Ólvido su contraseña?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
          iniciar sesion
        </LoadingButton>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
