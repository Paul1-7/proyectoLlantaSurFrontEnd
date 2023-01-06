import { Backdrop, CircularProgress, Container, Typography } from '@material-ui/core';
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

const getSubdsidiaryAndStock = (data) =>
  data.map(({ nombre, Sucursales_Productos: producto }) => [nombre, producto.stock]);

const columns = [
  'N°',
  'Nombre',
  'Precio de compra',
  'Precio de venta',
  'fecha',
  'suc 1',
  'suc 2',
  'marca',
  'categoria',
  'proveedor'
];

export default function InventoryReport() {
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios(customData);
  const optionsReport = useRef({});

  useEffect(() => {
    axiosFetchGet({
      axiosInstance: axios,
      method: 'GET',
      url: `/api/v1/productos`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!resGet.length) return;

    optionsReport.current = {
      columns,
      data: resGet,
      logo: {
        src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png',
        type: 'PNG', // optional, when src= data:uri (nodejs case)
        width: 25, // aspect ratio = width/height
        height: 13.66,
        margin: {
          top: 0, // negative or positive num, from the current position
          left: 0 // negative or positive num, from the current position
        }
      },
      stamp: {
        inAllPages: true, // by default = false, just in the last page
        src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg',
        type: 'JPG', // optional, when src= data:uri (nodejs case)
        width: 20, // aspect ratio = width/height
        height: 20,
        margin: {
          top: 0, // negative or positive num, from the current position
          left: 0 // negative or positive num, from the current position
        }
      },
      business: {
        name: 'Llanta sur',
        subsidiary: 'sucursal 1',
        reportDate: 'fecha de reporte: 2015/21/12'
      }
    };
  }, [resGet]);

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
        <LoadingButton
          loading={loadingGet}
          type="submit"
          loadingPosition="start"
          startIcon={<PictureAsPdf />}
          variant="outlined"
          disabled={!resGet.length || errorGet}
        >
          Reporte en PDF
        </LoadingButton>
        <LoadingButton
          loading={loadingGet}
          type="submit"
          loadingPosition="start"
          startIcon={<TableView />}
          variant="outlined"
          onClick={() => generatePDF(optionsReport.current)}
          disabled={!resGet.length || errorGet}
        >
          Reporte en CSV
        </LoadingButton>
      </Container>
    </Page>
  );
}
