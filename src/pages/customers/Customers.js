import { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { COLUMNS, TABLE_STATES } from 'constants/dataTable';
import useSettings from 'hooks/useSettings';
import Page from 'components/Page';
import useAxios from 'hooks/useAxios';
import axios from 'apis/apis';

import BreadcrumbsCustom from 'components/BreadcrumbsCustom';
import { PATH_MODULES } from 'routes/paths';
import DataTable from 'components/dataTable/DataTable';

import { useSnackbar } from 'notistack';
import DialogConfirmation from 'components/DialogConfirmation';
import TEXT_MODAL from 'utils/modalText';

const customData = ({ data }) => {
  const newData = data.map((item) => {
    const newValue = {
      id: item.idUsuario,
      nombre: item.nombre,
      apellido: item.apellido,
      'CI/Nit': item.ciNit,
      celular: item.celular,
      estado: item.estado
    };
    return newValue;
  });
  return { data: newData };
};

const buttonsActions = { edit: true, remove: true, detail: false };

export default function Customers() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios(customData);
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState('');

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (id) => {
    setDataDialog(id);
  };

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/v1/clientes/${id}`
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
      url: '/api/v1/clientes'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Typography gutterBottom>Administra la informacion de los clientes</Typography>
        <Grid container justifyContent="flex-end">
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
          states={TABLE_STATES.active}
          handleDelete={handleOpenDialog}
          setOpenDialog={setOpenDialog}
        />
      </Container>
    </Page>
  );
}
