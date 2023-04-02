import PropTypes from 'prop-types';
import { Backdrop, Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import useAxios from '~/hooks/useAxios';
import Page from '~/components/Page';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useSettings from '~/hooks/useSettings';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import Fieldset from '~/components/forms/Fieldset';
import { LoadingButton } from '@mui/lab';
import { Clear, Save } from '@mui/icons-material';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import { PATH_MODULES } from '~/routes/paths';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import SliderImageFormItem from '~/components/sliderImages/SliderImageFormItem';

const initialForm = {
  sliders: [],
};

const customDataProducts = ({ data }) => {
  const newData = data
    .filter(({ estado }) => estado === 1)
    .map(({ id, nombre }) => ({
      id,
      nombre,
    }));

  return { data: newData };
};

export default function SliderImagesForm() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [resGetSliderImages, errorGetSliderImages, loadingGetSliderImages, axiosFetchGetSliderImages] = useAxios();
  const [
    resPutSliderImages,
    errorPutSliderImages,
    loadingPutSliderImages,
    axiosFetchPutSliderImages,
    setResPutSliderImages,
  ] = useAxios();

  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios({
    responseCb: customDataProducts,
  });

  useSnackBarMessage({
    errors: [errorPutSliderImages, errorGetSliderImages, errorGetProducts],
    successes: [resPutSliderImages],
    setSuccesss: [setResPutSliderImages],
  });

  useEffect(() => {
    axiosFetchGetProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos`,
    });
    axiosFetchGetSliderImages({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/sliders-images`,
    });
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema.sliderImages),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });
  const { fields, append } = useFieldArray({
    control: methods.control,
    name: 'sliders',
  });

  useEffect(() => {
    if (!resGetSliderImages.length || errorGetSliderImages || !resGetProducts.length) return;

    resGetSliderImages.forEach((slider) => {
      append({ ...slider, idProd: slider.producto });
    });
  }, [resGetSliderImages, resGetProducts]);

  const onSubmit = (data) => {
    const newData = data.sliders.map((slider) => ({
      ...slider,
      idProd: slider.idProd.id,
    }));
    axiosFetchPutSliderImages({
      axiosInstance: axiosPrivate,
      method: 'PUT',
      url: `/api/v1/sliders-images`,
      requestConfig: {
        sliders: newData,
      },
    });
  };

  return (
    <Page title="Slider de imagenes">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
        open={loadingGetProducts || loadingGetSliderImages}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Slider de imagenes de la tienda
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Modifica los sliders de imagenes de la pagina principal de la tienda
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Información del slider de imagenes *">
              {!!fields.length &&
                !!resGetProducts.length &&
                fields.map((product, index) => (
                  <SliderImageFormItem product={product} allProducts={resGetProducts} key={product.id} index={index} />
                ))}
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button startIcon={<Clear />} variant="outlined" color="error" LinkComponent={Link} to={PATH_MODULES.app}>
                Cancelar
              </Button>
              <LoadingButton
                loading={loadingPutSliderImages}
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

SliderImagesForm.propTypes = {
  title: PropTypes.string,
};
