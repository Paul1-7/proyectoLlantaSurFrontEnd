import PropTypes from 'prop-types';
import { Box, Container, Grid, Typography } from '@material-ui/core';
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
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'validations';
import { Navigate } from 'react-router';
import { PATH_MODULES } from 'routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from 'components/SnackBar';

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

export default function AddCustomerForm({ title }) {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { response: resPost, error: errorPost, loading: loadingPost, axiosFetch: axiosFetchPost } = useAxios();
  const methods = useForm({
    resolver: yupResolver(schema.customer),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/clientes`,
      requestConfig: {
        ...data
      }
    });
  };

  useEffect(() => {
    if (Array.isArray(resPost) && errorPost) {
      const severity = 'error';

      enqueueSnackbar(errorPost?.message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPost]);

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
              <Grid container wrap="wrap" spacing={1}>
                <Controls.Input name="nombre" label="Nombre" />
                <Controls.Input name="apellido" label="Apellido" />
                <Controls.Input name="direccion" label="Direccion" />
                <Controls.Input type="number" name="celular" label="Celular" />
                <Controls.Input name="ciNit" label="CI / NIT" />
                <Controls.Input name="idSuc" label="Sucursal" />

                <Controls.RadioGroup name="estado" label="Estado" items={itemsRadioGroup} />
              </Grid>
            </Fieldset>
            <Fieldset title="Datos del usuario">
              <Grid container wrap="wrap" spacing={1}>
                <Controls.Input name="usuario" label="Usuario" placeholder="Por defecto es el CI / NIT" />
                <Controls.Input name="email" type="email" label="Email" />
                <Controls.Input
                  type="password"
                  name="password"
                  label="Contraseña"
                  placeholder="Por defecto es el numero de celular"
                />
                <Controls.Input
                  name="passwordConfirmation"
                  type="password"
                  label="Repetir contraseña"
                  placeholder="Por defecto es el numero de celular"
                />
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LoadingButton
                loading={loadingPost}
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
        {!loadingPost && !errorPost && !Array.isArray(resPost) && (
          <Navigate to={PATH_MODULES.modulos.clientes.root} replace state={resPost} />
        )}
        {/* {!loadingPost && errorPost && <p>{errorPost}</p>} */}
      </Container>
    </Page>
  );
}

AddCustomerForm.propTypes = {
  title: PropTypes.string
};
