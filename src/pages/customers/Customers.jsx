import { useContext, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
import DialogConfirmation from '~/components/DialogConfirmation';
import TEXT_MODAL from '~/utils/modalText';
import DataTableContext from '~/contexts/DataTableContext';

const customData = ({ data }) => {
  const newData = data.map((item) => {
    const newValue = {
      id: item.idUsuario,
      nombre: item.nombre,
      apellido: item.apellido,
      'CI/Nit': item.ciNit,
      celular: item.celular,
      estado: item.estado,
    };
    return newValue;
  });
  return { data: newData };
};

const buttonsActions = { edit: true, remove: true, detail: false };

export default function Customers() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const { enqueueSnackbar } = useSnackbar();
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios({ responseCb: customData });
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axiosPrivate,
      method: 'DELETE',
      url: `/api/v1/clientes/${id}`,
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
      url: '/api/v1/clientes',
    });
  }, []);

  return (
    <Page title="Clientes" sx={{ position: 'relative' }}>
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
          Clientes
        </Typography>
        <Typography sx={{ marginBottom: '1.5rem' }}>Administra la informacion de los clientes</Typography>
        <Grid container justifyContent={{ sm: 'flex-end' }} sx={{ marginBottom: '3rem' }}>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              LinkComponent={Link}
              to={PATH_MODULES.customers.new}
              startIcon={<PersonAddIcon />}
            >
              Nuevo cliente
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={COLUMNS.customers}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="nombre"
        />
      </Container>
    </Page>
  );
}
