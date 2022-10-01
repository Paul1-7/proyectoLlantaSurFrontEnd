import PropTypes from 'prop-types';
import { Box, Container, Grid, Typography } from '@material-ui/core';
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
import { Navigate } from 'react-router';
import { PATH_MODULES } from 'routes/paths';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from 'components/SnackBar';
import { ITEMS_RADIO_GROUP } from 'constants/items';
import UploadSingleFile from './UploadSingleFile';

const initialForm = {
  nombre: '',
  descripcion: '',
  estado: '1'
};

export default function AddBrandForm() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  console.log('TCL: AddBrandForm -> [files', file);
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const methods = useForm({
    resolver: yupResolver(schema.brands),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: axios,
      method: 'POST',
      url: `/api/v1/marcas`,
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

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  return (
    <Page title="Nueva marca">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Nueva marca
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Agrega una nueva marca
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos de la marca *">
              <Grid container wrap="wrap" spacing={2}>
                <Controls.Input name="nombre" label="Nombre" />
                <Controls.RadioGroup name="estado" label="Estado" items={ITEMS_RADIO_GROUP} />

                <UploadSingleFile file={file} onDrop={handleDropSingleFile} />
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
          <Navigate to={PATH_MODULES.brands.root} replace state={resPost} />
        )}
      </Container>
    </Page>
  );
}

AddBrandForm.propTypes = {
  title: PropTypes.string
};
