import { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, useLocation } from 'react-router-dom';

import { COLUMNS, TABLE_STATES } from 'constants/dataTable';
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
  const { enqueueSnackbar } = useSnackbar();
  const {
    response: resGet,
    setResponse: setResGet,
    error: errorGet,
    loading: loadingGet,
    axiosFetch: axiosFetchGet
  } = useAxios(customData);
  const { response: resDelete, error: errorDelete, loading: loadingDelete, axiosFetch: axiosFetchDelete } = useAxios();
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
    }
    if (!Array.isArray(resDelete) && !errorDelete) {
      message = resDelete?.message;
      setResGet(resGet.filter(({ id }) => id !== dataDialog));
    }

    if (Array.isArray(resDelete) && errorDelete) {
      message = errorDelete;
      severity = 'error';
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 4000,
        variant: severity
      });
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
        textContent={TEXT_MODAL.clientes}
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
              to={PATH_MODULES.modulos.clientes.nuevo}
              startIcon={<PersonAddIcon />}
            >
              Nuevo cliente
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={COLUMNS.clientes}
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
