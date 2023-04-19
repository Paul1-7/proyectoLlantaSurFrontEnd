import PropTypes from 'prop-types';
import { Autocomplete, Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import useAxios from '~/hooks/useAxios';
import Page from '~/components/Page';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useSettings from '~/hooks/useSettings';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import Controls from '~/components/forms/Control';
import Fieldset from '~/components/forms/Fieldset';
import { LoadingButton } from '@mui/lab';
import { Clear, Save } from '@mui/icons-material';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import { Navigate } from 'react-router';
import { PATH_MODULES } from '~/routes/paths';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from '~/components/SnackBar';
import { MIconButton } from '~/components/@material-extend';
import { Link } from 'react-router-dom';

const initialForm = {
  data: [],
};
const idSucursalBorrar = '678197a0-69a8-4c24-89a5-bf13873cc08b';

const getStockFromCurrentSubsidiary = (subsidiaries, idSuc) => {
  return subsidiaries
    .filter(({ id }) => id === idSuc)
    .map(({ SucursalesProductos: subsidiary }) => subsidiary.stock)
    .at(0);
};

const initialProductValue = { idProd: '0', label: 'Ninguno', nombre: '', stock: 0 };

const productsCustomData = ({ data }) => {
  const newData = data.map(({ nombre, sucursales, id }) => ({
    idProd: id,
    nombre,
    stock: getStockFromCurrentSubsidiary(sucursales, idSucursalBorrar),
    label: `${nombre} - ${getStockFromCurrentSubsidiary(sucursales, idSucursalBorrar)} (disponibles)`,
  }));
  return { data: [...[initialProductValue], ...newData] };
};

export default function AddDefectiveProductsForm() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [productValue, setProductValue] = useState(initialProductValue);
  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios({
    responseCb: productsCustomData,
  });

  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();

  const methods = useForm({
    resolver: yupResolver(schema.defectiveProducts),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'data',
  });

  const handleAddProduct = () => {
    const msgProductDuplicated = 'El producto seleccionado ya existe, seleccione otro';
    const productDuplicated = fields.find(({ idProd }) => idProd === productValue.idProd);

    if (productDuplicated) {
      enqueueSnackbar(msgProductDuplicated, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity="error" />,
      });
      return;
    }

    append({ ...productValue, cantidad: 1, descripcion: '', idSuc: idSucursalBorrar });
  };

  const handleChangeProduct = (value) => {
    setProductValue(() => value);
  };

  useEffect(() => {
    axiosFetchGetProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos`,
    });
  }, []);

  const onSubmit = (data) => {
    axiosFetchPost({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/productos-defectuosos`,
      requestConfig: {
        ...data,
      },
    });
  };

  useEffect(() => {
    const severity = 'error';
    const msg = errorPost?.message ?? errorGetProducts?.message;

    if (!msg) return;

    enqueueSnackbar(msg, {
      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      autoHideDuration: 5000,
      content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
    });
  }, [errorPost, errorGetProducts]);

  return (
    <Page title="nuevo producto defectuosos">
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Nuevo producto defectuoso
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Agrega el registro de uno o varios productos defectuosos
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del producto">
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <Autocomplete
                  options={resGetProducts}
                  disablePortal
                  size="small"
                  renderInput={(params) => <TextField {...params} label="Selecciona un producto" />}
                  isOptionEqualToValue={(option, value) => option.idProd === value.idProd}
                  fullWidth
                  value={productValue}
                  loading={loadingGetProducts}
                  onChange={(_, value) => handleChangeProduct(value)}
                />
                <Button variant="outlined" size="small" onClick={handleAddProduct}>
                  Agregar producto
                </Button>
              </Stack>
              <Typography align="center" sx={{ mb: { xs: 3, sm: 2 } }}>
                Productos defectuosos
              </Typography>
              {!fields.length && (
                <Typography align="center" variant="body2">
                  No hay productos
                </Typography>
              )}
              {fields.map((field, index) => (
                <Grid container key={field.id} spacing={2} alignItems={{ xs: 'center', sm: 'start' }}>
                  <Grid item xs={12} sm={4} md={4}>
                    <Controls.Input name={`data.${index}.nombre`} isArray label="Producto" disabled />
                  </Grid>
                  <Grid item xs={12} sm={2} md={1}>
                    <Controls.Input name={`data.${index}.stock`} isArray label="Stock" disabled />
                  </Grid>
                  <Grid item xs={12} sm={2} md={1}>
                    <Controls.Input name={`data.${index}.cantidad`} isArray label="Cantidad" />
                  </Grid>
                  <Grid item xs={12} sm={2} md={4}>
                    <Controls.Input name={`data.${index}.descripcion`} isArray label="Descripcion" />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={1}
                    md={1}
                    order={{ xs: -1, sm: 0 }}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <MIconButton onClick={() => remove(index)} color="error">
                      <Clear />
                    </MIconButton>
                  </Grid>
                </Grid>
              ))}
            </Fieldset>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button
                startIcon={<Clear />}
                variant="outlined"
                color="error"
                LinkComponent={Link}
                to={PATH_MODULES.defectiveProducts.root}
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
          <Navigate to={PATH_MODULES.defectiveProducts.root} replace state={resPost} />
        )}
      </Container>
    </Page>
  );
}

AddDefectiveProductsForm.propTypes = {
  title: PropTypes.string,
};
