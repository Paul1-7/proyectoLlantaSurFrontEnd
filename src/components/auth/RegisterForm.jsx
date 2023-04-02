import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import { ITEMS_RADIO_GROUP } from '~/constants/items';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import Controls from '../forms/Control';
import Fieldset from '../forms/Fieldset';

function RegisterForm({ loading }) {
  return (
    <>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <LoadingButton loading={loading} type="submit" loadingPosition="start" startIcon={<Save />} variant="contained">
          Guardar
        </LoadingButton>
      </Box>
    </>
  );
}

RegisterForm.propTypes = {
  loading: PropTypes.bool,
};

export default RegisterForm;
