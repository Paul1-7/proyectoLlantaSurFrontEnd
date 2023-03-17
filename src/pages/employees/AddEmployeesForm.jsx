import PropTypes from 'prop-types';
import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import useAxios from '~/hooks/useAxios';
import Page from '~/components/Page';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useSettings from '~/hooks/useSettings';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import Controls from '~/components/forms/Control';
import Fieldset from '~/components/forms/Fieldset';
import { LoadingButton } from '@mui/lab';
import { Clear, Save } from '@mui/icons-material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import { Navigate } from 'react-router';
import { PATH_MODULES } from '~/routes/paths';
import { useEffect } from 'react';
import { ITEMS_RADIO_GROUP, ITEMS_SELECTS } from '~/constants/items';
import { Link } from 'react-router-dom';
import useErrorMessage from '~/hooks/useErrorMessage';

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
  idSuc: '0',
  roles: [ITEMS_SELECTS[1].idRol],
};

function SubsidiariesCustomData({ data }) {
  const newData = data.filter(({ estado }) => estado === 1).map(({ id: idSuc, nombre }) => ({ idSuc, nombre }));

  return { data: newData };
}

export default function AddEmployeesForm() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const [resGetSubsidiaries, errorGetSubsidiaries, loadingGetSubsidiaries, axiosFetchGetSubsidiaries] = useAxios({
    responseCb: SubsidiariesCustomData,
  });

  useErrorMessage({ errors: [errorPost, errorGetSubsidiaries] });
  const methods = useForm({
    resolver: yupResolver(schema.employees),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  useEffect(() => {
    axiosFetchGetSubsidiaries({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/sucursales/`,
    });
  }, []);

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/empleados`,
      requestConfig: {
        ...data,
      },
    });
  };

  return (
    <Page title="nuevo empleado">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGetSubsidiaries}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Nuevo empleado
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Agrega un nuevo empleado
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del empleado *">
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
                  <Controls.Select name="idSuc" label="Sucursal" items={resGetSubsidiaries} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.SelectChip name="roles" label="Roles" items={ITEMS_SELECTS} />
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
                to={PATH_MODULES.employees.root}
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
          <Navigate to={PATH_MODULES.employees.root} replace state={resPost} />
        )}
      </Container>
    </Page>
  );
}

AddEmployeesForm.propTypes = {
  title: PropTypes.string,
};
