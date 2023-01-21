import { useContext, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { COLUMNS } from 'constants/dataTable';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';
import useAxios from 'hooks/useAxios';
import axios from 'apis/apis';

import BreadcrumbsCustom from 'components/BreadcrumbsCustom';
import { PATH_MODULES } from 'routes/paths';
import DialogConfirmation from 'components/DialogConfirmation';
import TEXT_MODAL from 'utils/modalText';
import DataTable from 'components/dataTable/DataTable';

import { useSnackbar } from 'notistack';
import DataTableContext from 'contexts/DataTableContext';
import { Discount } from '@mui/icons-material';

const buttonsActions = { edit: true, remove: true, detail: true };

export default function Discounts() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const navigate = useNavigate();
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios();
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/v1/descuentos/${id}`
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
        variant: severity
      });
      message = null;
    }
    setOpenDialog(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, resDelete, errorDelete]);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/v1/descuentos'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Descuentos" sx={{ position: 'relative' }}>
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
          Descuentos
        </Typography>
        <Typography sx={{ marginBottom: '1.5rem' }}>
          Administra la informacion de los descuentos de productos
        </Typography>
        <Grid container justifyContent={{ sm: 'flex-end' }} sx={{ marginBottom: '3rem' }}>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              LinkComponent={Link}
              to={PATH_MODULES.discounts.new}
              startIcon={<Discount />}
            >
              Nuevo descuento
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={COLUMNS.discounts}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="fechaFin"
        />
      </Container>
    </Page>
  );
}
