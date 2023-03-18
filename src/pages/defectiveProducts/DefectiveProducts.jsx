import { useContext, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { COLUMNS } from '~/constants/dataTable';
import useSettings from '~/hooks/useSettings';
import Page from '~/components/Page';
import useAxios from '~/hooks/useAxios';

import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { PATH_MODULES } from '~/routes/paths';
import DialogConfirmation from '~/components/DialogConfirmation';
import TEXT_MODAL from '~/utils/modalText';
import DataTable from '~/components/dataTable/DataTable';

import { useSnackbar } from 'notistack';
import { LibraryAdd } from '@mui/icons-material';
import DataTableContext from '~/contexts/DataTableContext';
import useAuth from '~/hooks/useAuth';
import { ROLES } from '~/config';

const { ADMINISTRADOR } = ROLES;
const buttonsActions = { remove: true, detail: false };

const customData = ({ data }) => {
  const newData = data.map((value) => ({
    ...value,
    codVenta: value.venta?.codVenta ?? 'no aplica',
    producto: value.producto.nombre,
    sucursal: value.sucursal.nombre,
  }));

  return { data: newData };
};

export default function Categories() {
  const axiosPrivate = useAxiosPrivate();
  const { isRolUserAllowedTo } = useAuth();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const navigate = useNavigate();
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios({ responseCb: customData });
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axiosPrivate,
      method: 'DELETE',
      url: `/api/v1/productos-defectuosos/${id}`,
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
      url: '/api/v1/productos-defectuosos',
    });
  }, []);

  return (
    <Page title="Productos defectuosos" sx={{ position: 'relative' }}>
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
          Productos defectuosos
        </Typography>
        <Typography gutterBottom>Administra la informacion de los productos que tienen algún problema</Typography>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              LinkComponent={Link}
              to={PATH_MODULES.defectiveProducts.new}
              startIcon={<LibraryAdd />}
            >
              Nuevo producto defectuoso
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={COLUMNS.defectivesProducts}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={!isRolUserAllowedTo([ADMINISTRADOR.id]) && buttonsActions}
          orderByDefault="fecha"
          orderDesc
        />
      </Container>
    </Page>
  );
}
