import PropTypes from 'prop-types';
import { Backdrop, Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import useAxios from 'hooks/useAxios';
import Page from 'components/Page';
import axios from 'apis/apis';
import useSettings from 'hooks/useSettings';
import BreadcrumbsCustom from 'components/BreadcrumbsCustom';
import Controls from 'components/forms/Control';
import Fieldset from 'components/forms/Fieldset';
import { LoadingButton } from '@material-ui/lab';
import { Save } from '@material-ui/icons';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { Navigate, useLocation } from 'react-router';
import { PATH_MODULES } from 'routes/paths';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from 'components/SnackBar';
import { ITEMS_RADIO_GROUP } from 'constants/items';

const initialForm = {
  nombre: '',
  descripcion: '',
  estado: '1'
};

export default function ModifyBrandForm() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [resPut, errorPut, loadingPut, axiosFetchPut, , setErrorPut] = useAxios();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();

  const id = location.pathname.split('/').pop();

  const methods = useForm({
    resolver: yupResolver(schema.brands),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    axiosFetchPut({
      axiosInstance: axios,
      method: 'PUT',
      url: `/api/v1/marcas/${id}`,
      requestConfig: {
        ...data
      }
    });
  };

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/marcas/${id}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!Array.isArray(resGet) && !errorGet) {
      const keys = Object.keys(initialForm);
      const objectArray = Object.entries(resGet);

      for (const [key, value] of objectArray) {
        if (keys.includes(key)) {
          methods.setValue(key, String(value), { shouldValidate: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resGet]);

  useEffect(() => {
    const severity = 'error';
    let message = null;

    if (Array.isArray(resPut) && errorPut) {
      message = errorPut?.message;
      setErrorPut(null);
    }

    if (Array.isArray(resGet) && errorGet) {
      message = errorGet?.message;
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorPut, errorGet]);

  return (
    <Page title="Modificar marca">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Modificar marca
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Modifica una marca existente
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos de la marca *">
              <Grid container wrap="wrap" spacing={1}>
                <Controls.Input name="nombre" label="Nombre" />
                <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LoadingButton
                loading={loadingPut}
                type="submit"
                loadingPosition="start"
                startIcon={<Save />}
                variant="outlined"
                disabled={Array.isArray(resGet) && errorGet}
              >
                Guardar
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
        {!loadingPut && !errorPut && !Array.isArray(resPut) && (
          <Navigate to={PATH_MODULES.brands.root} replace state={resPut} />
        )}
      </Container>
    </Page>
  );
}

ModifyBrandForm.propTypes = {
  title: PropTypes.string
};
