import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@material-ui/core';
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
import { DialogAnimate } from '../../components/animate';

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

const columns = ['numeracion', 'nombre', 'apellido', 'CI/Nit', 'estado', 'celular'];

const buttonsValues = { edit: true, remove: true, detail: false };

export default function Empleados() {
  const { themeStretch } = useSettings();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(callback);
  const [isOpen, setIsOpen] = useState(false);
  const newColumns = createDataTableColumns(columns, buttonsValues, setIsOpen);

  const handleClickOpen = () => {
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
    <Page title="Clientes">
      <DialogAnimate open={isOpen} maxWidth="sm" onClose={handleClickOpen}>
        <DialogTitle sx={{ textAlign: 'center' }}>Ventana de confimación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ textAlign: 'center', padding: '16px' }}>
            ¿Estas seguro de querer eliminar este registro de manera permanente de clientes?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Button onClick={handleClickOpen} color="error" variant="outlined">
            no, quiero cancelar
          </Button>
          <Button onClick={handleClickOpen} autoFocus color="success" variant="outlined">
            si, estoy de acuerdo
          </Button>
        </DialogActions>
      </DialogAnimate>
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
