import PropTypes from 'prop-types';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import useAxios from '~/hooks/useAxios';
import Page from '~/components/Page';
import axios from '~/apis/apis';
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
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import { ITEMS_RADIO_GROUP } from '~/constants/items';
import { Link } from 'react-router-dom';

const initialForm = {
  nombre: '',
  descripcion: '',
  estado: '1',
};

export default function AddCategoriesForm() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const methods = useForm({
    resolver: yupResolver(schema.categories),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/categorias`,
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
    <Page title="nueva categoria">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Nueva categoria
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Agrega una nueva categoria
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos de la categoria *">
              <Grid container wrap="wrap" spacing={1}>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="nombre" label="Nombre" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input name="descripcion" multiline label="Descripcion" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />
                </Grid>
              </Grid>
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button
                startIcon={<Clear />}
                variant="outlined"
                color="error"
                LinkComponent={Link}
                to={PATH_MODULES.categories.root}
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
          <Navigate to={PATH_MODULES.categories.root} replace state={resPost} />
        )}
      </Container>
    </Page>
  );
}

AddCategoriesForm.propTypes = {
  title: PropTypes.string,
};
