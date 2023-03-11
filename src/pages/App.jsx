// material
import { Backdrop, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from '~/apis/apis';
import { useEffect } from 'react';

import Page from '~/components/Page';
import useSettings from '~/hooks/useSettings';
import { AppWelcome } from '~/components/dashboard';
import { ChartBar } from '~/components/charts';
import useErrorMessage from '~/hooks/useErrorMessage';
import useAxios from '~/hooks/useAxios';

const getStockFromSubsidiaries = (subsidiaries) => {
  return subsidiaries
    .filter(({ estado }) => estado === 1)
    .map((subsidiary) => ({
      nombre: subsidiary.nombre,
      stock: subsidiary.Sucursales_Productos.stock,
    }));
};

const productCustomData = ({ data }) => {
  const newData = data.map(({ id, nombre, sucursales }) => ({
    id,
    nombre,
    sucursales: getStockFromSubsidiaries(sucursales),
    // sucursales,
  }));
  return { data: newData };
};

function getDataToBestSellingProducts(products = []) {
  const columns = products.map(({ nombre }) => nombre);

  const dataRows = products.map(({ cantidadVendida }) => cantidadVendida);

  return { columnsBestSelling: columns, dataBestSelling: [{ name: 'cantidad vendida', data: dataRows }] };
}

function getStockLowProducts(products, minStockAvailable) {
  if (!products.length || !minStockAvailable) return {};

  const productsWithLowStock = [];
  const columns = [];
  products.forEach((product) => {
    const productFounded = product.sucursales.find(({ stock }) => stock <= minStockAvailable);

    if (productFounded && productsWithLowStock.length < 8) {
      productsWithLowStock.push(productFounded);
      columns.push(product.nombre);
    }
  });

  const rows = productsWithLowStock.map((sucursales) => sucursales.stock);

  return { columnsProductsLowStock: columns, dataProductsLowStock: [{ name: 'cantidad', data: rows }] };
}

export default function App() {
  const { themeStretch } = useSettings();
  const [resGetBestSellingProd, errorGetBestSellingProd, loadingGetBestSellingProd, axiosFetchGetBestSellingProd] =
    useAxios();
  const [resGetProducts, errorGetProducts, loadingGetProducts, axiosFetchGetProducts] = useAxios(productCustomData);
  const [resGetBusinessData, errorGetBusinessData, loadingGetBusinessData, axiosFetchGetBusinessData] = useAxios();

  useEffect(() => {
    axiosFetchGetBestSellingProd({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/v1/productos/best-selling',
    });
    axiosFetchGetBusinessData({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/v1/datos-negocio',
    });
    axiosFetchGetProducts({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/v1/productos',
    });
  }, []);

  useErrorMessage({ errors: [errorGetBestSellingProd, errorGetProducts, errorGetBusinessData] });

  const { columnsBestSelling, dataBestSelling } = getDataToBestSellingProducts(resGetBestSellingProd);
  const { columnsProductsLowStock, dataProductsLowStock } = getStockLowProducts(
    resGetProducts,
    resGetBusinessData?.cantMinProd,
  );
  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
          open={loadingGetProducts || loadingGetBusinessData || loadingGetBestSellingProd}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AppWelcome displayName="aas" />
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
