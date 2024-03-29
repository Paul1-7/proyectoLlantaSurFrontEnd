import { Backdrop, CircularProgress, Container, Grid, Typography } from '@mui/material';

import { useEffect } from 'react';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import Page from '~/components/Page';
import useSettings from '~/hooks/useSettings';
import { AppWelcome } from '~/components/dashboard';
import { ChartBar } from '~/components/charts';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import useAxios from '~/hooks/useAxios';
import useAuth from '~/hooks/useAuth';

const getStockFromSubsidiaries = (subsidiaries) => {
  return subsidiaries
    .filter(({ estado }) => estado === 1)
    .map((subsidiary) => ({
      nombre: subsidiary.nombre,
      stock: subsidiary.SucursalesProductos.stock,
    }));
};

const productCustomData = ({ data }) => {
  const newData = data.map(({ id, nombre, sucursales, stockMin }) => ({
    id,
    nombre,
    sucursales: getStockFromSubsidiaries(sucursales),
    stockMin,
    // sucursales,
  }));
  return { data: newData };
};

function getDataToBestSellingProducts(products = []) {
  const columns = products.map(({ nombre }) => nombre);

  const dataRows = products.map(({ cantidadVendida }) => cantidadVendida);

  return { columnsBestSelling: columns, dataBestSelling: [{ name: 'cantidad vendida', data: dataRows }] };
}

function getStockLowProducts(products) {
  if (!products.length) return {};

  const productsWithLowStock = [];
  const columns = [];
  products.forEach((product) => {
    const productFounded = product.sucursales.find(({ stock }) => stock <= product.stockMin);

    if (productFounded && productsWithLowStock.length < 8) {
      productsWithLowStock.push(productFounded);
      columns.push(product.nombre);
    }
  });
  const rows = productsWithLowStock.map((sucursales) => sucursales.stock);

  return { columnsProductsLowStock: columns, dataProductsLowStock: [{ name: 'cantidad', data: rows }] };
}

export default function App() {
  const { auth } = useAuth();
  const { nombre, apellido } = auth?.user ?? {};
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [resGetBestSellingProd, errorGetBestSellingProd, loadingGetBestSellingProd, axiosFetchGetBestSellingProd] =
    useAxios();
  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios({
    responseCb: productCustomData,
  });

  useEffect(() => {
    axiosFetchGetBestSellingProd({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: '/api/v1/productos/best-selling',
    });

    axiosFetchGetProducts({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: '/api/v1/productos',
    });
  }, []);

  useSnackBarMessage({ errors: [errorGetBestSellingProd, errorGetProducts] });

  const { columnsBestSelling, dataBestSelling } = getDataToBestSellingProducts(resGetBestSellingProd);
  const { columnsProductsLowStock, dataProductsLowStock } = getStockLowProducts(resGetProducts);
  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
          open={loadingGetProducts || loadingGetBestSellingProd}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppWelcome displayName={`${nombre} ${apellido}`} />
        <Grid container spacing={2} sx={{ pt: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" align="center">
              Productos mas vendidos
            </Typography>
            <ChartBar columns={columnsBestSelling} rows={dataBestSelling} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" align="center">
              Productos con bajo stock
            </Typography>
            <ChartBar columns={columnsProductsLowStock} rows={dataProductsLowStock} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
