import PropTypes from 'prop-types';
import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import useAxios from '~/hooks/useAxios';
import Page from '~/components/Page';
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
import { Link } from 'react-router-dom';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import { useEffect, useState } from 'react';
import useAuth from '~/hooks/useAuth';

const getAllSubsidiaries = (sucursales) => {
  return sucursales
    .filter(({ estado }) => estado === 1)
    .map(({ id, nombre, SucursalesProductos: sp }) => ({ id, nombre, stock: sp.stock }));
};

const initialForm = {
  cantidad: '1',
  idProd: { nombre: 'Ninguno', id: '0' },
  idSucOrigen: '0',
  idSucDestino: '0',
  idUsuario: '',
};

export default function AddInterBranchMovements() {
  const { auth } = useAuth();
  const { idUsuario } = auth?.user ?? {};
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [resPostMovement, errorPostMovement, loadingPostMovement, axiosFetchPostMovement] = useAxios();

  const customDataProducts = ({ data }) => {
    const newData = data
      .filter(({ estado }) => estado === 1)
      .map(({ id, nombre, precioVenta, sucursales }) => ({
        id,
        nombre,
        precio: precioVenta,
        sucursales: getAllSubsidiaries(sucursales),
      }));

    return { data: newData };
  };
  const [resGetSubsidiaries, errorGetSubsidiaries, loadingGetSubsidiaries, axiosFetchGetSubsidiaries] = useAxios();
  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios({
    responseCb: customDataProducts,
  });
  const [maxQuantityFromSubsidiary, setMaxQuantityFromSubsidiary] = useState(1);

  useSnackBarMessage({
    errors: [errorPostMovement, errorGetProducts, errorGetSubsidiaries],
  });

  const methods = useForm({
    resolver: yupResolver(schema.interBranchMovements(maxQuantityFromSubsidiary)),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const productWatch = methods.watch('idProd');
  const subsidiaryOriginWatch = methods.watch('idSucOrigen');

  useEffect(() => {
    if (productWatch.id === '0' || subsidiaryOriginWatch === '0') return;
    const productFounded = productWatch.sucursales.find(({ id }) => id === subsidiaryOriginWatch);

    setMaxQuantityFromSubsidiary(() => productFounded?.stock);
  }, [productWatch, subsidiaryOriginWatch]);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      idProd: data.idProd.id,
      idUsuario,
    };

    axiosFetchPostMovement({
      axiosInstance: axiosPrivate,
      method: 'POST',
      url: `/api/v1/movimientos-sucursales`,
      requestConfig: {
        ...newData,
      },
    });
  };

  useEffect(() => {
    axiosFetchGetProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/productos`,
    });
    axiosFetchGetSubsidiaries({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/sucursales`,
    });
  }, []);

  return (
    <Page title="Nueva movimiento entre sucursal">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGetSubsidiaries}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Nuevo movimiento entre sucursal
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Agrega el registro del movimiento de un producto de una sucursal a otra
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Fieldset title="Datos del movimiento *">
              <Grid container wrap="wrap" spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controls.Select label="Sucursal de origen" name="idSucOrigen" items={resGetSubsidiaries} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controls.Select label="Sucursal de destino" name="idSucDestino" items={resGetSubsidiaries} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Autocomplete
                    label="Producto"
                    name="idProd"
                    items={resGetProducts}
                    loading={loadingGetProducts}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controls.Input
                    label={`Cantidad (máximo ${maxQuantityFromSubsidiary} unidades)`}
                    name="cantidad"
                    type="number"
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
                to={PATH_MODULES.interBranchMovements.root}
              >
                Cancelar
              </Button>
              <LoadingButton
                loading={loadingPostMovement}
                type="submit"
                loadingPosition="start"
                startIcon={<Save />}
                variant="outlined"
                disabled={Array.isArray(resPostMovement) && errorPostMovement}
              >
                Guardar
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
        {!loadingPostMovement && !errorPostMovement && !Array.isArray(resPostMovement) && (
          <Navigate to={PATH_MODULES.interBranchMovements.root} replace state={resPostMovement} />
        )}
      </Container>
    </Page>
  );
}

AddInterBranchMovements.propTypes = {
  title: PropTypes.string,
};
