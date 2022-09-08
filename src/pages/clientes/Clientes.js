import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, Container, Grid, Typography } from '@material-ui/core';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import useAxios from '../../hooks/useAxios';
import axios from '../../apis/apis';
import { createDataTableColumns } from '../../utils/handleDataTable';
import BreadcrumbsCustom from '../../components/BreadcrumbsCustom';
import { PATH_MODULES } from '../../routes/paths';
import DialogConfirmation from '../../components/DialogConfirmation';
import TEXT_MODAL from '../../utils/modalText';
import COLUMNS from '../../utils/dataTablesColumns';

const callback = ({ data }) => {
  const newData = data.map((item, index) => {
    const newValue = {
      numeracion: index + 1,
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

const buttonsValues = { edit: true, remove: true, detail: false };

export default function Clientes() {
  const { themeStretch } = useSettings();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(callback);
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete] = useAxios();
  const [isOpen, setIsOpen] = useState(false);
  const newColumns = createDataTableColumns(COLUMNS.clientes, buttonsValues, setIsOpen);

  const handleClickOpen = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    axiosFetchDelete({
      axiosInstance: axios,
      method: 'DELETE',
      url: '/api/v1/clientes'
    });
    setIsOpen(false);
  };

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
      {resDelete && (
        <Alert variant="outlined" severity="success" sx={{ position: 'absolute', bottom: 0, right: 0, zIndex: 9999 }}>
          <AlertTitle>Se realizó con exito</AlertTitle>
          {resDelete}
        </Alert>
      )}
      <DialogConfirmation
        isOpen={isOpen}
        handleClickOpen={handleClickOpen}
        handleDelete={handleDelete}
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
        <DataTable data={resGet} columns={newColumns} loading={loadingGet} error={errorGet} />
      </Container>
    </Page>
  );
}
