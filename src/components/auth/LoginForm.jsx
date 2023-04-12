import { Link, Stack, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_MODULES } from '~/routes/paths';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import Controls from '../forms/Control';

function LoginForm({ methods, loading }) {
  return (
    <>
      <Stack spacing={3}>
        <Controls.Input type="email" label="Ingrese su email o usuario" name="usuario" size="medium" />
        <Controller
          name="password"
          control={methods.control}
          render={({ field }) => (
            <TextField
              variant="outlined"
              type="password"
              label="Contraseña"
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
        <Link component={RouterLink} variant="subtitle2" to={PATH_MODULES.auth.resetPasswordEmail}>
          ¿Ólvido su contraseña?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
        iniciar sesion
      </LoadingButton>
    </>
  );
}
LoginForm.propTypes = {
  methods: PropTypes.object,
  loading: PropTypes.bool,
};
export default LoginForm;
