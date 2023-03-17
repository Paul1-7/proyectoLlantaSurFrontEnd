import PropTypes from 'prop-types';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import useAxios from '~/hooks/useAxios';
import Page from '~/components/Page';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useSettings from '~/hooks/useSettings';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import Controls from '~/components/forms/Control';
import Fieldset from '~/components/forms/Fieldset';
import { LoadingButton } from '@mui/lab';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import { Navigate } from 'react-router';
import { PATH_MODULES } from '~/routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import { ITEMS_RADIO_GROUP } from '~/constants/items';
import { Link } from 'react-router-dom';
import { Clear, Save } from '@mui/icons-material';

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
  idSuc: '678197a0-69a8-4c24-89a5-bf13873cc08b',
};

export default function AddCustomerForm() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const methods = useForm({
    resolver: yupResolver(schema.customer),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/clientes`,
      requestConfig: {
        ...data,
      },
    });
  };

  useEffect(() => {
    if (Array.isArray(resPost) && errorPost) {
      const severity = 'error';

      enqueueSnackbar(errorPost?.message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
      });
    }
  }, [errorPost]);

  return (
    <Page title="nuevo cliente">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Nuevo cliente
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
                  <Controls.Input type="number" name="celular" label="Celular" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="ciNit" label="CI / NIT" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="idSuc" label="Sucursal" disabled />
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
              <Button
                startIcon={<Clear />}
                variant="outlined"
                color="error"
                LinkComponent={Link}
                to={PATH_MODULES.customers.root}
              >
                Cancelar
              </Button>
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
          <Navigate to={PATH_MODULES.customers.root} replace state={resPost} />
        )}
      </Container>
    </Page>
  );
}

AddCustomerForm.propTypes = {
  title: PropTypes.string,
};
