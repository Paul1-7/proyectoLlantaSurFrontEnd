import { useContext, useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { COLUMNS } from '~/constants/dataTable';
import useSettings from '~/hooks/useSettings';
import Page from '~/components/Page';
import useAxios from '~/hooks/useAxios';
import axios from '~/apis/apis';

import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { PATH_MODULES } from '~/routes/paths';
import DialogConfirmation from '~/components/DialogConfirmation';
import TEXT_MODAL from '~/utils/modalText';
import DataTable from '~/components/dataTable/DataTable';

import { useSnackbar } from 'notistack';
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
      roles: item.roles.map((rol) => rol.nombreRol),
    };

    return newValue;
  });
  return { data: newData };
};

const buttonsActions = { edit: true, remove: true, detail: false };

export default function Employees() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setOpenDialog, handleCloseDialog, openDialog, dataDialog } = useContext(DataTableContext);
  const [resGet, errorGet, loadingGet, axiosFetchGet, setResGet] = useAxios(customData);
  const [resDelete, errorDelete, loadingDelete, axiosFetchDelete, , setErrorDelete] = useAxios();
  const location = useLocation();

  const handleDelete = (id) => {
    axiosFetchDelete({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/v1/empleados/${id}`,
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
      message = errorDelete.message;
      severity = 'error';
      setErrorDelete(null);
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 4000,
        variant: severity,
      });
    }
    setOpenDialog(false);
  }, [location, resDelete, errorDelete]);

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/v1/empleados',
    });
  }, []);

  return (
    <Page title="Empleados" sx={{ position: 'relative' }}>
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
          Empleados
        </Typography>
        <Typography sx={{ marginBottom: '1.5rem' }}>Administra la informacion de los empleados</Typography>
        <Grid container justifyContent={{ sm: 'flex-end' }} sx={{ marginBottom: '3rem' }}>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              LinkComponent={Link}
              to={PATH_MODULES.employees.new}
              startIcon={<PersonAddIcon />}
            >
              Nuevo empleado
            </Button>
          </Grid>
        </Grid>
        <DataTable
          columns={COLUMNS.employees}
          rows={resGet}
          error={errorGet}
          loading={loadingGet}
          numeration
          btnActions={buttonsActions}
          orderByDefault="roles"
        />
      </Container>
    </Page>
  );
}
