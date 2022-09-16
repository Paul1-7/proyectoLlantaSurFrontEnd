import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import useAxios from 'hooks/useAxios';
import Page from 'components/Page';
import axios from 'apis/apis';
import useSettings from 'hooks/useSettings';
import BreadcrumbsCustom from 'components/BreadcrumbsCustom';
// import { useForm } from 'hooks/useForm';
import Controls from 'components/forms/Control';
import Fieldset from 'components/forms/Fieldset';
import { LoadingButton } from '@material-ui/lab';
import { Save } from '@material-ui/icons';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'validations';

const initialForm = {
  usuario: '',
  email: '',
  password: '',
  nombre: '',
  foto: '',
  apellido: '',
  estado: '1',
  direccion: '',
  celular: '',
  ciNit: '',
  idSuc: '678197a0-69a8-4c24-89a5-bf13873cc08b'
};

const itemsRadioGroup = [
  {
    id: '1',
    title: 'Habilitado'
  },
  {
    id: '0',
    title: 'Deshabilitado'
  }
];

export default function FormularioCliente({ title }) {
  const { themeStretch } = useSettings();
  // const { values, setValues, handleInputChange } = useForm(initialForm);
  const methods = useForm({
    resolver: yupResolver(schema.customer),
    defaultValues: initialForm
  });
  console.log('TCL: FormularioCliente -> methods', methods.watch());

  const onSubmit = (data) => {
    console.log(data);
    // if (validate()) {
    //   resetForm();
    // }
  };

  return (
    <Page title={title}>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Agrega un nuevo cliente
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del cliente *">
              <Grid container wrap="wrap" spacing={2}>
                <Controls.Input name="nombre" label="Nombre" />
                <Controls.Input name="apellido" label="Apellido" />
                <Controls.Input name="direccion" label="Direccion" />
                <Controls.Input name="celular" label="Celular" />
                <Controls.Input name="ciNit" label="CI / NIT" />
                <Controls.Input name="idSuc" label="Sucursal" />

                <Controls.RadioGroup name="estado" label="Estado" items={itemsRadioGroup} />
              </Grid>
            </Fieldset>
            <Fieldset title="Datos del usuario">
              <Grid container wrap="wrap" spacing={2}>
                <Controls.Input name="usuario" label="Usuario" placeholder="Por defecto es el CI / NIT" />
                <Controls.Input name="email" label="Email" />
                <Controls.Input name="password" label="Contraseña" placeholder="Por defecto es el numero de celular" />
                <Controls.Input
                  name="passwordConfirmation"
                  label="Repetir contraseña"
                  placeholder="Por defecto es el numero de celular"
                />
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LoadingButton
                loading={false}
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
      </Container>
    </Page>
  );
}

FormularioCliente.propTypes = {
  title: PropTypes.string
};
