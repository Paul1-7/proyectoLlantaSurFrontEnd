import { Backdrop, Box, Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import useAxios from 'hooks/useAxios';
import Page from 'components/Page';
import axios from 'apis/apis';
import useSettings from 'hooks/useSettings';
import BreadcrumbsCustom from 'components/BreadcrumbsCustom';
import { LoadingButton } from '@material-ui/lab';
import { PictureAsPdf, TableView } from '@material-ui/icons';
import { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';
import SnackBar from 'components/SnackBar';
import generatePDF from 'utils/inventoryReport';
import { FormProvider, useForm } from 'react-hook-form';
import Controls from 'components/forms/Control';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from 'schemas';
import { ITEM_INVENTORY_REPORT_CRITERIA } from 'constants/items';
import { ITEM_INVENTORY_REPORT_SUBSIDIARIES } from '../../constants/items';

const customData = ({ data }) => {
  const newData = data.map((item, index) => [
    index + 1,
    item.nombre,
    item.precioCompra,
    item.precioVenta,
    new Date(item.fecha).toLocaleDateString(),
    // ...item.sucursales.map(({ nombre }) => nombre),
    ...item.sucursales.map(({ Sucursales_Productos: producto }) => producto.stock),

    item.marca.nombre,
    item.categoria.nombre,
    item.proveedor.nombre
  ]);

  return { data: newData };
};

// const getSubdsidiaryAndStock = (data) =>
//   data.map(({ nombre, Sucursales_Productos: producto }) => [nombre, producto.stock]);

// const columns = [
//   'N°',
//   'Nombre',
//   'Precio de compra',
//   'Precio de venta',
//   'fecha',
//   'suc 1',
//   'suc 2',
//   'marca',
//   'categoria',
//   'proveedor'
// ];

const initialForm = {
  criterio: '0',
  sucursal: '0'
};

export default function InventoryReport() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(customData);
  const optionsReport = useRef({});
  const reportType = useRef(null);

  const methods = useForm({
    resolver: yupResolver(schema.inventaryReport),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  });

  const onSubmit = (data) => {
    console.log('TCL: onSubmit -> data', data);

    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/productos`
    });
  };

  // useEffect(() => {
  //   if (!resGet.length) return;

  //   optionsReport.current = {
  //     columns,
  //     data: resGet,
  //     logo: {
  //       src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png',
  //       type: 'PNG', // optional, when src= data:uri (nodejs case)
  //       width: 25, // aspect ratio = width/height
  //       height: 13.66,
  //       margin: {
  //         top: 0, // negative or positive num, from the current position
  //         left: 0 // negative or positive num, from the current position
  //       }
  //     },
  //     stamp: {
  //       inAllPages: true, // by default = false, just in the last page
  //       src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
  //       type: 'JPG', // optional, when src= data:uri (nodejs case)
  //       width: 20, // aspect ratio = width/height
  //       height: 20,
  //       margin: {
  //         top: 0, // negative or positive num, from the current position
  //         left: 0 // negative or positive num, from the current position
  //       }
  //     },
  //     business: {
  //       name: 'Llanta sur',
  //       subsidiary: 'sucursal 1',
  //       reportDate: 'fecha de reporte: 2015/21/12'
  //     }
  //   };
  // }, [resGet]);

  useEffect(() => {
    const severity = 'error';
    let message = null;

    if (Array.isArray(resGet) && errorGet) {
      message = errorGet?.message;
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorGet]);

  return (
    <Page title="Reporte del inventario">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loadingGet}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1">
          Reporte del inventario
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Genera reportes del inventario de productos en formato PDF o CSV
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
            autoComplete="off"
          >
            <Grid container wrap="wrap" spacing={1}>
              <Grid item xs={12} md={6}>
                <Controls.Select name="criterio" label="Criterios" items={ITEM_INVENTORY_REPORT_CRITERIA} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Select name="sucursal" label="Sucursal" items={ITEM_INVENTORY_REPORT_SUBSIDIARIES} />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <Button
                type="submit"
                startIcon={<PictureAsPdf />}
                variant="outlined"
                onClick={() => (reportType.current = 'PDF')}
              >
                Reporte en PDF
              </Button>
              <Button
                type="submit"
                startIcon={<TableView />}
                variant="outlined"
                onClick={() => (reportType.current = 'CSV')}
              >
                Reporte en CSV
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Container>
    </Page>
  );
}
