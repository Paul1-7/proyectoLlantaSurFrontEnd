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
import useSnackBarMessage from '~/hooks/useSnackBarMessage';
import {
  COLUMNS_CSV_SALES_REPORT,
  COLUMN_SALES_REPORT_PDF,
  ITEM_TO_ALL_REPORT_SUBSIDIARIES,
  SALES_REPORT_FREQUENCY_OPTIONS,
  SALES_REPORT_SORT_OPTIONS,
} from '~/constants/salesReport';
import { add, addHours } from 'date-fns';
import { TABLE_STATES } from '~/constants/dataTable';
import { getDateTimeFormat } from '~/utils/dataHandler';
import HeaderBussinessInfo from '~/components/HeaderBussinessInfo';
import useAuth from '~/hooks/useAuth';

const customDataSubsidiary = ({ data }) => {
  const newData = data.map(({ id, nombre }) => ({ id, name: nombre }));
  return { data: newData };
};

const initialForm = {
  criterio: DEFAULT_VALUE_ITEM,
  sucursal: DEFAULT_VALUE_ITEM,
  orderBy: DEFAULT_VALUE_ITEM,
  dateStart: new Date(),
  dateEnd: add(new Date(), { days: 1 }),
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

export default function SalesReport() {
  const { auth } = useAuth();
  const { nombre, apellido } = auth?.user ?? {};
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [showAllRows, setShowAllRows] = useState(true);
  const [resGetSale, errorGetSale, loadingGetSale, axiosFetchGetSale] = useAxios();
  const [resGetSubsidiary, errorGetSubsidiary, loadingGetSubsidiary, axiosFetchGetSubsidiary] = useAxios({
    responseCb: customDataSubsidiary,
  });
  const [resGetBussinessInfo, errorGetBussinessInfo, loadingGetBussinessInfo, axiosFetchGetBussinessInfo] = useAxios();
  const subsidiaries = [...resGetSubsidiary, ...ITEM_TO_ALL_REPORT_SUBSIDIARIES];

  useSnackBarMessage({
    errors: [errorGetSale, errorGetSubsidiary, errorGetBussinessInfo],
  });

  const methods = useForm({
    resolver: yupResolver(schema.salesReport),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const watchValues = methods.watch();

  const nameCriteria = SALES_REPORT_FREQUENCY_OPTIONS.find(({ id }) => id === watchValues.criterio)?.name;
  const FILENAME = `ReporteVentas-${nameCriteria}`;

  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({ fileName: FILENAME });

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
    let dateStart;
    let dateEnd = new Date();

    if (
      watchValues.criterio === DEFAULT_VALUE_ITEM ||
      watchValues.sucursal === DEFAULT_VALUE_ITEM ||
      watchValues.orderBy === DEFAULT_VALUE_ITEM
    )
      return;

    if (watchValues.criterio !== '5') {
      const criteriaOption = SALES_REPORT_FREQUENCY_OPTIONS.find(({ id }) => id === watchValues.criterio);
      dateStart = criteriaOption.dateStart?.toISOString();
      dateEnd = criteriaOption.dateEnd?.toISOString();
    } else {
      dateStart = watchValues.dateStart;
      dateEnd = watchValues.dateEnd;
    }

    if (!dateStart || !dateEnd) return;

    const dateEndMoreHr = addHours(new Date(dateEnd), 1);
    const url = `/api/v1/ventas/report/?dateStart=${dateStart}&dateEnd=${dateEndMoreHr}&orderBy=${watchValues.orderBy}&subsidiary=${watchValues.sucursal}`;

    axiosFetchGetSale({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url,
    });
  }, [watchValues.criterio, watchValues.orderBy, watchValues.sucursal, watchValues.dateStart, watchValues.dateEnd]);

  const handleDataCSV = () => {
    return resGetSale.map(({ codVenta, fecha, tipoVenta, cliente, vendedor, sucursal, total }) => ({
      codVenta,
      fecha,
      tipoVenta: TABLE_STATES.salesTypes[tipoVenta]?.name,
      cliente: cliente.ciNit,
      vendedor: vendedor.apellido,
      sucursal: sucursal.nombre,
      total,
    }));
  };

  return (
    <Page title="Reporte de ventas">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
        open={loadingGetSale || loadingGetSubsidiary || loadingPrint || loadingGetBussinessInfo}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" sx={sxNoPrint}>
          Reporte de ventas
        </Typography>
        <Typography gutterBottom variant="subtitle1" sx={sxNoPrint}>
          Genera reportes de las ventas de productos en formato PDF o CSV
        </Typography>
        <FormProvider {...methods}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} autoComplete="off">
            <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
              <Grid item xs={12} md={6}>
                <Controls.Select name="criterio" label="Criterios" items={SALES_REPORT_FREQUENCY_OPTIONS} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Select name="sucursal" label="Sucursal" items={subsidiaries} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Select name="orderBy" label="Ordenar por" items={SALES_REPORT_SORT_OPTIONS} />
              </Grid>
              {Number(watchValues.criterio) === 5 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ ...sxNoPrint, pb: 3 }}>
                    Seleccione el rango de fechas
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} xsm={6}>
                      <Controls.DatePicker label="Fecha de inicio" name="dateStart" />
                    </Grid>
                    <Grid item xs={12} xsm={6}>
                      <Controls.DatePicker label="Fecha de finalización" name="dateEnd" />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
            {!resGetSale.length && (
              <Typography align="center" variant="body2" sx={{ pt: 2 }}>
                No hay registros con los criterios definidos
              </Typography>
            )}
            {!!resGetSale.length && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', ...sxNoPrint }}>
                <Button type="button" startIcon={<PictureAsPdf />} variant="outlined" onClick={handlePrint}>
                  Reporte en PDF
                </Button>
                <CsvDownloader
                  datas={handleDataCSV}
                  columns={COLUMNS_CSV_SALES_REPORT}
                  filename={FILENAME}
                  extension=".csv"
                  separator=","
                >
                  <Button startIcon={<TableView />} variant="outlined">
                    Reporte en CSV
                  </Button>
                </CsvDownloader>
              </Box>
            )}
          </form>
        </FormProvider>

        {!!resGetSale.length && (
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
                    disabled={resGetSale.length <= 10}
                  />
                }
                label="Mostrar solo las 10 primeras filas"
              />
            </FormGroup>
            <HeaderBussinessInfo sx={{ display: 'none', displayPrint: 'block' }} data={resGetBussinessInfo} />
            <Typography gutterBottom variant="h3" align="center" sx={{ display: 'none', displayPrint: 'inherit' }}>
              Reporte de ventas
            </Typography>
            <Grid container wrap="wrap">
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Ordenado por: ${
                  SALES_REPORT_SORT_OPTIONS.find(({ id }) => id === watchValues.orderBy)?.name ?? ''
                }`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Criterio: ${
                  SALES_REPORT_FREQUENCY_OPTIONS.find(({ id }) => id === watchValues.criterio)?.name ?? ''
                }`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Sucursal: ${
                  subsidiaries.find(({ id }) => id === watchValues.sucursal.toString())?.name ?? ''
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
                    {COLUMN_SALES_REPORT_PDF.map((column, index) => (
                      <TableCell key={index} align="center">
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resGetSale.map((sale, index) => (
                    <TableRow
                      key={index}
                      sx={showAllRows && index >= 10 ? { display: 'none', displayPrint: 'table-row' } : {}}
                    >
                      <TableCell component="th" scope="row" align="center" sx={styleTableCell}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {sale.codVenta}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {new Date(sale.fecha).toLocaleDateString()}
                      </TableCell>

                      <TableCell align="center" sx={styleTableCell}>
                        {sale.cliente.ciNit}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {sale.vendedor.apellido}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {sale.sucursal.nombre}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {Number(sale.total).toFixed(2)}
                      </TableCell>
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
