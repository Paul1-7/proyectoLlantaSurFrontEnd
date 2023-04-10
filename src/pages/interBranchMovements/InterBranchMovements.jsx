import { useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { COLUMNS } from '~/constants/dataTable';
import useSettings from '~/hooks/useSettings';
import Page from '~/components/Page';
import useAxios from '~/hooks/useAxios';

import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { PATH_MODULES } from '~/routes/paths';
import DataTable from '~/components/dataTable/DataTable';

import { useSnackbar } from 'notistack';
import { LibraryAdd } from '@mui/icons-material';

const customData = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    nombre: `${item.usuario.nombre} ${item.usuario.apellido}`,
    sucOrigen: item.sucursalOrigen.nombre,
    sucDestino: item.sucursalDestino.nombre,
    producto: item.producto.nombre,
  }));

  return { data: newData };
};

export default function InterBranchMovements() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios({ responseCb: customData });

  const location = useLocation();

  useEffect(() => {
    let message = null;
    const severity = 'success';
    let keySnackBar;
    if (location.state?.message) {
      message = location.state.message;
      navigate(location.pathname, { replace: true });
    }

    if (message) {
      keySnackBar = enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 4000,
        variant: severity,
      });
      message = null;
    }

    return () => {
      closeSnackbar(keySnackBar);
    };
  }, [location]);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: '/api/v1/movimientos-sucursales',
    });
  }, []);

  return (
    <Page title="Movimientos entre sucursales" sx={{ position: 'relative' }}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph>
          Movimientos entre sucursales
        </Typography>
        <Typography sx={{ marginBottom: '1.5rem' }}>Gestiona los registros de productos entre sucursales</Typography>
        <Grid container justifyContent={{ sm: 'flex-end' }} sx={{ marginBottom: '3rem' }}>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              LinkComponent={Link}
              to={PATH_MODULES.interBranchMovements.new}
              startIcon={<LibraryAdd />}
            >
              Nuevo movimiento
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={COLUMNS.interBranchMovements}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          orderByDefault="fecha"
          orderDesc
        />
      </Container>
    </Page>
  );
}
