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
import { Inventory2 } from '@material-ui/icons';
import DataTableContext from 'contexts/DataTableContext';

const buttonsActions = { edit: true, remove: true, detail: false };

const idSucBorrar = '678197a0-69a8-4c24-89a5-bf13873cc08b';

const currentSubsidiaryStock = (idSuc, subsidiaries) => {
  const value = subsidiaries?.find((subsidiary) => subsidiary.id === idSuc);

  return value ? value.Sucursales_Productos.stock : '0';
};

const stockOtherSubsidiary = (subsidiaries) =>
  subsidiaries.map((subsidiary) => ({
    nombre: subsidiary.nombre,
    stock: subsidiary.Sucursales_Productos.stock
  }));

const customData = ({ data }) => {
  const newData = data.map((item) => ({
    ...item,
    marca: item.marca.nombre,
    categoria: item.categoria.nombre,
    proveedor: item.proveedor.nombre,
    stock: currentSubsidiaryStock(idSucBorrar, item.sucursales),
    sucursales: stockOtherSubsidiary(item.sucursales)
  }));

  return { data: newData };
};

export default function Products() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const navigate = useNavigate();
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios(customData);
  const [resGetBusinessData, errorGetBusinessData, loadingGetBusinessData, axiosFetchGetBusinessData] = useAxios();
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();

  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/v1/productos/${id}`
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
      url: '/api/v1/productos'
    });
    axiosFetchGetBusinessData({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/v1/datos-negocio'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          btnActions={buttonsActions}
          orderByDefault="nombre"
          collapse="sucursales"
        />
      </Container>
    </Page>
  );
}
