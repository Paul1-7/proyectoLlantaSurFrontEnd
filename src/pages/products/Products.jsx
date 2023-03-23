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
import { Inventory2 } from '@mui/icons-material';
import DataTableContext from '~/contexts/DataTableContext';
import useAuth from '~/hooks/useAuth';
import { ROLES } from '~/config';

const { ADMINISTRADOR } = ROLES;
const buttonsActions = { edit: true, remove: true, detail: false };

const idSucBorrar = '678197a0-69a8-4c24-89a5-bf13873cc08b';

const currentSubsidiaryStock = (idSuc, subsidiaries) => {
  const value = subsidiaries?.find((subsidiary) => subsidiary.id === idSuc);

  return value ? value.Sucursales_Productos.stock : '0';
};

const stockOtherSubsidiary = (subsidiaries) =>
  subsidiaries.map((subsidiary) => ({
    nombre: subsidiary.nombre,
    stock: subsidiary.Sucursales_Productos.stock,
  }));

const customData = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    marca: item.marca.nombre,
    categoria: item.categoria.nombre,
    proveedor: item.proveedor.nombre,
    stock: currentSubsidiaryStock(idSucBorrar, item.sucursales),
    sucursales: stockOtherSubsidiary(item.sucursales),
  }));

  return { data: newData };
};

export default function Products() {
  const { isRolUserAllowedTo } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const navigate = useNavigate();
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios({ responseCb: customData });
  const [resGetBusinessData, errorGetBusinessData, loadingGetBusinessData, axiosFetchGetBusinessData] = useAxios();
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();

  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axiosPrivate,
      method: 'DELETE',
      url: `/api/v1/productos/${id}`,
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
      url: '/api/v1/productos',
    });
    axiosFetchGetBusinessData({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: '/api/v1/datos-negocio',
    });
  }, []);

  return (
    <Page title="Productos" sx={{ position: 'relative' }}>
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
          Productos
        </Typography>
        <Typography sx={{ marginBottom: '1.5rem' }}>Administra la informacion de los productos</Typography>
        <Grid container justifyContent={{ sm: 'flex-end' }} sx={{ marginBottom: '3rem' }}>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              LinkComponent={Link}
              to={PATH_MODULES.products.new}
              startIcon={<Inventory2 />}
              disabled={!isRolUserAllowedTo([ADMINISTRADOR.id])}
            >
              Nuevo producto
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={COLUMNS.products}
          rows={resGet}
          error={errorGet ?? errorGetBusinessData}
          loading={loadingGet || loadingGetBusinessData}
          numeration
          minStock={resGetBusinessData?.cantMinProd}
          btnActions={isRolUserAllowedTo([ADMINISTRADOR.id]) && buttonsActions}
          orderByDefault="nombre"
          collapse="sucursales"
        />
      </Container>
    </Page>
  );
}
