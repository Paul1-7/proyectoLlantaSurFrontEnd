import { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
import { useSSR } from 'react-i18next';

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
export default function Clientes() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const { response: resGet, error: errorGet, loading: loadingGet, axiosFetch: axiosFetchGet } = useAxios(customData);
  const { response: resDelete, error: errorDelete, loading: loadingDelete, axiosFetch: axiosFetchDelete } = useAxios();
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState('');

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    if (confirmDialog) {
      setDataDialog(id);
    }
  };

  // useEffect(() => {
  //  axiosFetchDelete({
  //    axiosInstance: axios,
  //    method: 'DELETE',
  //    url: `/api/v1/clientes/${dataDialog}`
  //  });
  //  const variant = 'success';

  //  console.log('handle delete');
  //  if (resDelete.length > 0) {
  //    setOpenDialog(false);
  //    enqueueSnackbar('This is a success message!', {
  //      variant,
  //      anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
  //      autoHideDuration: 3000
  //    });
  //  }

  // }, []);

  const getData = () => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/v1/clientes'
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <Page title="Clientes" sx={{ position: 'relative' }}>
      <DialogConfirmation
        open={openDialog}
        handleClickClose={handleCloseDialog}
        setResponse={setConfirmDialog}
        loading={loadingDelete}
        textContent={TEXT_MODAL.clientes}
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
        />
      </Container>
    </Page>
  );
}
