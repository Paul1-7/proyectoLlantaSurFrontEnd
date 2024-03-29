import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import useAxios from '~/hooks/useAxios';
import Page from '~/components/Page';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import CsvDownloader from 'react-csv-downloader';
import useSettings from '~/hooks/useSettings';
import BreadcrumbsCustom from '~/components/BreadcrumbsCustom';
import { PictureAsPdf, TableView } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Controls from '~/components/forms/Control';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '~/schemas';
import { DEFAULT_VALUE_ITEM } from '~/constants/items';
import { usePrint } from '~/hooks/usePrint';
import {
  COLUMN_INVENTORY_REPORT_BY_DEFAULT,
  ID_CSV_PRODUCT,
  ITEM_INVENTORY_REPORT_CRITERIA,
  ITEM_INVENTORY_REPORT_SUBSIDIARIES,
} from '~/constants/inventaryReport';
import useAuth from '~/hooks/useAuth';
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import HeaderBussinessInfo from '~/components/HeaderBussinessInfo';
import { getDateTimeFormat } from '~/utils/dataHandler';

const customDataSubsidiary = ({ data }) => {
  const newData = data.map(({ id, nombre }) => ({ id, name: nombre }));
  return { data: newData };
};

const initialForm = {
  criterio: DEFAULT_VALUE_ITEM,
  sucursal: DEFAULT_VALUE_ITEM,
};

const sxNoPrint = {
  '@media print': {
    display: 'none',
  },
};

const styleTableCell = {
  '@media print': {
    padding: '0.3rem',
    fontSize: '13px',
  },
};

export default function InventoryReport() {
  const { auth } = useAuth();
  const { nombre, apellido } = auth?.user ?? {};
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [showAllRows, setShowAllRows] = useState(true);
  const [resGet, errorGet, loadingGet, axiosFetchGet] = useAxios();
  const [resGetSubsidiary, errorGetSubsidiary, loadingGetSubsidiary, axiosFetchGetSubsidiary] = useAxios({
    responseCb: customDataSubsidiary,
  });
  const [resGetBussinessInfo, errorGetBussinessInfo, loadingGetBussinessInfo, axiosFetchGetBussinessInfo] = useAxios();
  useSnackBarMessage({ errors: [errorGetSubsidiary, errorGetBussinessInfo, errorGet] });

  const methods = useForm({
    resolver: yupResolver(schema.inventaryReport),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });
  const subsidiaries = [...resGetSubsidiary, ...ITEM_INVENTORY_REPORT_SUBSIDIARIES];
  const criterio = methods.watch('criterio');
  const sucursal = methods.watch('sucursal');

  const nameCriteria = ITEM_INVENTORY_REPORT_CRITERIA.find(({ id }) => id === criterio)?.name;
  const FILENAME = `ReporteInventario-${nameCriteria}`;

  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({ fileName: FILENAME });
  const { sucursales = [] } = resGet?.at(0) ?? {};

  useEffect(() => {
    axiosFetchGetSubsidiary({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/sucursales`,
    });

    axiosFetchGetBussinessInfo({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: `/api/v1/datos-negocio`,
    });
  }, []);

  useEffect(() => {
    if (criterio === DEFAULT_VALUE_ITEM || sucursal === DEFAULT_VALUE_ITEM) return;

    const url = `/api/v1/productos/reportes/?criterio=${criterio}&sucursal=${sucursal}`;

    axiosFetchGet({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url,
    });
  }, [criterio, sucursal]);

  const getStockSubsidiariesToCSV = (subsidiaries, columnsName) => {
    const productEntries = subsidiaries.map(({ stock }, index) => [columnsName[index].displayname, stock]);
    return Object.fromEntries(productEntries);
  };

  const transformProductsData = (products, columnsName) =>
    products.map((product) => ({
      Nombre: product.nombre,
      'Precio de compra': product.precioCompra,
      'Precio de venta': product.precioVenta,
      Fecha: new Date(product.fecha).toLocaleDateString(),
      Categoria: product.categoria.nombre,
      Marca: product.marca.nombre,
      Proveedor: product.proveedor.nombre,
      ...getStockSubsidiariesToCSV(product.sucursalesProductos, columnsName),
    }));

  const handleDataCSV = () => {
    const nameColumns =
      sucursales.length > 1
        ? sucursales.map(({ nombre }, index) => ({ id: `${ID_CSV_PRODUCT}-${index}`, displayname: nombre }))
        : [{ id: ID_CSV_PRODUCT, displayname: resGetSubsidiary.find(({ id }) => id === sucursal).name }];

    return transformProductsData(resGet, nameColumns);
  };
  return (
    <Page title="Reporte del inventario">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
        open={loadingGet || loadingGetSubsidiary || loadingPrint || loadingGetBussinessInfo}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" sx={sxNoPrint}>
          Reporte del inventario
        </Typography>
        <Typography gutterBottom variant="subtitle1" sx={sxNoPrint}>
          Genera reportes del inventario de productos en formato PDF o CSV
        </Typography>
        <FormProvider {...methods}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} autoComplete="off">
            <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
              <Grid item xs={12} md={6}>
                <Controls.Select name="criterio" label="Criterios" items={ITEM_INVENTORY_REPORT_CRITERIA} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Select name="sucursal" label="Sucursal" items={subsidiaries} />
              </Grid>
            </Grid>
            {!!resGet.length && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', ...sxNoPrint }}>
                <Button type="button" startIcon={<PictureAsPdf />} variant="outlined" onClick={handlePrint}>
                  Reporte en PDF
                </Button>
                <CsvDownloader datas={handleDataCSV} filename={FILENAME} extension=".csv" separator=",">
                  <Button startIcon={<TableView />} variant="outlined">
                    Reporte en CSV
                  </Button>
                </CsvDownloader>
              </Box>
            )}
          </form>
        </FormProvider>
        {!resGet.length && (
          <Typography align="center" variant="body2" sx={{ pt: 2 }}>
            No hay registros con los criterios definidos
          </Typography>
        )}
        {!!resGet.length && (
          <Grid
            ref={componentToPrintRef}
            sx={{
              '@media print': {
                padding: '2rem',
              },
              minWidth: '720px',
            }}
          >
            <FormGroup sx={{ paddingBottom: '2rem', ...sxNoPrint }}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    size="small"
                    value={showAllRows}
                    onChange={() => setShowAllRows(!showAllRows)}
                    disabled={resGet.length <= 10}
                  />
                }
                label="Mostrar solo las 10 primeras filas"
              />
            </FormGroup>
            <HeaderBussinessInfo sx={{ display: 'none', displayPrint: 'block' }} data={resGetBussinessInfo} />
            <Typography gutterBottom variant="h3" align="center" sx={{ display: 'none', displayPrint: 'inherit' }}>
              Reporte de Inventario
            </Typography>
            <Grid container wrap="wrap">
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Criterio: ${
                  ITEM_INVENTORY_REPORT_CRITERIA.find(({ id }) => id === criterio)?.name
                }`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Sucursal: ${
                  subsidiaries.find(({ id }) => id === sucursal.toString())?.name ?? ''
                }`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5, display: 'none', displayPrint: 'inherit' }}
                >{`Fecha del reporte: ${getDateTimeFormat(new Date())}`}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'none', displayPrint: 'inherit' }}>
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1.5 }}
                >{`Realizado por: ${nombre} ${apellido}`}</Typography>
              </Grid>
            </Grid>

            <TableContainer sx={{ paddingTop: '1rem' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {COLUMN_INVENTORY_REPORT_BY_DEFAULT.map((column, index) => (
                      <TableCell key={index} align="center">
                        {column}
                      </TableCell>
                    ))}
                    {sucursales.length > 1 ? (
                      sucursales.map(({ nombre }, index) => (
                        <TableCell align="center" key={`${index}-${nombre}`}>
                          {nombre}
                        </TableCell>
                      ))
                    ) : (
                      <TableCell align="center">Cantidad</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resGet.map((product, index) => (
                    <TableRow
                      key={index}
                      sx={showAllRows && index >= 10 ? { display: 'none', displayPrint: 'table-row' } : {}}
                    >
                      <TableCell component="th" scope="row" align="center" sx={styleTableCell}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {product.nombre}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {product.precioCompra}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {product.precioVenta}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {new Date(product.fecha).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {product.categoria.nombre}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {product.marca.nombre}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {product.proveedor.nombre}
                      </TableCell>
                      {product.sucursalesProductos.map(({ stock }, index) => (
                        <TableCell align="center" sx={styleTableCell} key={`${index}-${stock}`}>
                          {stock}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
