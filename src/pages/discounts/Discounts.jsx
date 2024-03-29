import { useContext, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { COLUMNS } from '~/constants/dataTable';
import useSettings from '~/hooks/useSettings';
import Page from '~/components/Page';
import useAxios from '~/hooks/useAxios';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { PATH_MODULES } from '~/routes/paths';
import DialogConfirmation from '~/components/DialogConfirmation';
import TEXT_MODAL from '~/utils/modalText';
import DataTable from '~/components/dataTable/DataTable';

import { useSnackbar } from 'notistack';
import DataTableContext from '~/contexts/DataTableContext';
import { Discount } from '@mui/icons-material';
import useAuth from '~/hooks/useAuth';
import { ROLES } from '~/config';

const { ADMINISTRADOR } = ROLES;
const buttonsActions = { edit: true, remove: true, detail: true };

export default function Discounts() {
  const { isRolUserAllowedTo } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const navigate = useNavigate();
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios();
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axiosPrivate,
      method: 'DELETE',
      url: `/api/v1/descuentos/${id}`,
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
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: '/api/v1/descuentos',
    });
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
              disabled={!isRolUserAllowedTo([ADMINISTRADOR.id])}
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
          btnActions={isRolUserAllowedTo([ADMINISTRADOR.id]) && buttonsActions}
          orderByDefault="fechaFin"
        />
      </Container>
    </Page>
  );
}
