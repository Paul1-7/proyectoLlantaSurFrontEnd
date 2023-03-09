import { useContext, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { COLUMNS } from '~/constants/dataTable';
import useSettings from '~/hooks/useSettings';
import Page from '~/components/Page';
import useAxios from '~/hooks/useAxios';
import axios from '~/apis/apis';

import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { PATH_MODULES } from '~/routes/paths';
import DialogConfirmation from '~/components/DialogConfirmation';
import TEXT_MODAL from '~/utils/modalText';
import DataTable from '~/components/dataTable/DataTable';

import { useSnackbar } from 'notistack';
import { Sell } from '@mui/icons-material';
import DataTableContext from '~/contexts/DataTableContext';

const buttonsActions = { edit: true, remove: false, detail: true };

const customData = ({ data }) => {
  const newData = data.map((item) => ({ ...item, cliente: item.cliente.nombre, vendedor: item.vendedor.nombre }));

  return { data: newData };
};

export default function Sales() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const navigate = useNavigate();
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios(customData);
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/v1/ventas/${id}`,
    });
  };

  useEffect(() => {
    let message = null;
    let severity = 'success';
    if (location.state?.message) {
      message = location.state.message;
      navigate(location.pathname, { replace: true });
    }
    if (!Array.isArray(resDelete) && !errorDelete) {
      message = resDelete?.message;
      setResGet(resGet.filter((item) => item.id !== resDelete.id));
    }

    if (Array.isArray(resDelete) && errorDelete) {
      message = errorDelete?.message;
      severity = 'error';
      setErrorDelete(null);
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 4000,
        variant: severity,
      });
      message = null;
    }
    setOpenDialog(false);
  }, [location, resDelete, errorDelete]);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/v1/ventas',
    });
  }, []);

  return (
    <Page title="Ventas" sx={{ position: 'relative' }}>
      <DialogConfirmation
        open={openDialog}
        setOpen={setOpenDialog}
        handleClickClose={handleCloseDialog}
        handleDelete={handleDelete}
        loading={loadingDelete}
        textContent={TEXT_MODAL.delete}
        id={dataDialog}
      />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph>
          Ventas
        </Typography>
        <Typography sx={{ marginBottom: '1.5rem' }}>Administra la informacion de las ventas</Typography>
        <Grid container justifyContent={{ sm: 'flex-end' }} sx={{ marginBottom: '3rem' }}>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              LinkComponent={Link}
              to={PATH_MODULES.sells.new}
              startIcon={<Sell />}
            >
              Nueva venta
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={COLUMNS.sells}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="codVenta"
        />
      </Container>
    </Page>
  );
}
