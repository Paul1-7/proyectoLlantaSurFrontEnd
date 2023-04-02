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

import { add } from 'date-fns';
import {
  COLUMNS_CSV_PURCHASES_REPORT,
  COLUMN_PURCHASES_REPORT_PDF,
  PURCHASES_REPORT_FREQUENCY_OPTIONS,
  PURCHASES_REPORT_SORT_OPTIONS,
} from '~/constants/purchasesReport';
import { getBOBCurrency } from '~/utils/dataHandler';

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

export default function PurchasesReport() {
  const axiosPrivate = useAxiosPrivate();
  const { themeStretch } = useSettings();
  const [showAllRows, setShowAllRows] = useState(true);
  const [resGetPurchase, errorGetPurchase, loadingGetPurchase, axiosFetchGetPurchase] = useAxios();
  useSnackBarMessage({
    errors: [errorGetPurchase],
  });

  const methods = useForm({
    resolver: yupResolver(schema.purchasesReport),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const watchValues = methods.watch();

  const nameCriteria = PURCHASES_REPORT_FREQUENCY_OPTIONS.find(({ id }) => id === watchValues.criterio)?.name;
  const FILENAME = `ReporteCompras-${nameCriteria}`;

  const { loadingPrint, componentToPrintRef, handlePrint } = usePrint({ fileName: FILENAME });

  useEffect(() => {
    let dateStart;
    let dateEnd;

    if (watchValues.criterio === DEFAULT_VALUE_ITEM || watchValues.orderBy === DEFAULT_VALUE_ITEM) return;

    if (watchValues.criterio !== '5') {
      const criteriaOption = PURCHASES_REPORT_FREQUENCY_OPTIONS.find(({ id }) => id === watchValues.criterio);
      dateStart = criteriaOption.dateStart?.toISOString();
      dateEnd = criteriaOption.dateEnd?.toISOString();
    } else {
      dateStart = watchValues.dateStart;
      dateEnd = watchValues.dateEnd;
    }

    if (!dateStart || !dateEnd) return;

    const url = `/api/v1/compras/report/?dateStart=${dateStart}&dateEnd=${dateEnd}&orderBy=${watchValues.orderBy}`;

    axiosFetchGetPurchase({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url,
    });
  }, [watchValues.criterio, watchValues.orderBy, watchValues.dateStart, watchValues.dateEnd]);

  const handleDataCSV = () => {
    return resGetPurchase.map(({ codCompra, fecha, usuario, proveedor, total }) => ({
      codCompra,
      fecha,
      usuario: usuario.apellido,
      proveedor: proveedor.nombre,
      total,
    }));
  };

  return (
    <Page title="Reporte de compras">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer }}
        open={loadingGetPurchase || loadingPrint}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" sx={sxNoPrint}>
          Reporte de compras
        </Typography>
        <Typography gutterBottom variant="subtitle1" sx={sxNoPrint}>
          Genera reportes de las compras de productos en formato PDF o CSV
        </Typography>
        <FormProvider {...methods}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} autoComplete="off">
            <Grid container wrap="wrap" spacing={1} sx={sxNoPrint}>
              <Grid item xs={12} md={6}>
                <Controls.Select name="criterio" label="Criterios" items={PURCHASES_REPORT_FREQUENCY_OPTIONS} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Select name="orderBy" label="Ordenar por" items={PURCHASES_REPORT_SORT_OPTIONS} />
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

            {!!resGetPurchase.length && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', ...sxNoPrint }}>
                <Button type="button" startIcon={<PictureAsPdf />} variant="outlined" onClick={handlePrint}>
                  Reporte en PDF
                </Button>
                <CsvDownloader
                  datas={handleDataCSV}
                  columns={COLUMNS_CSV_PURCHASES_REPORT}
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
        {!resGetPurchase.length && (
          <Typography align="center" variant="body2" sx={{ pt: 2 }}>
            No hay registros con los criterios definidos
          </Typography>
        )}
        {!!resGetPurchase.length && (
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
                    disabled={resGetPurchase.length <= 10}
                  />
                }
                label="Mostrar solo las 10 primeras filas"
              />
            </FormGroup>
            <Typography gutterBottom variant="h3" align="center" sx={{ display: 'none', displayPrint: 'inherit' }}>
              Reporte de compras
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.5 }}
            >{`Fecha del reporte: ${new Date().toLocaleDateString()}`}</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{`Criterio: ${
              PURCHASES_REPORT_FREQUENCY_OPTIONS.find(({ id }) => id === watchValues.criterio)?.name
            }`}</Typography>
            <TableContainer sx={{ paddingTop: '1rem' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {COLUMN_PURCHASES_REPORT_PDF.map((column, index) => (
                      <TableCell key={index} align="center">
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resGetPurchase.map((purchase, index) => (
                    <TableRow
                      key={index}
                      sx={showAllRows && index >= 10 ? { display: 'none', displayPrint: 'table-row' } : {}}
                    >
                      <TableCell component="th" scope="row" align="center" sx={styleTableCell}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {purchase.codCompra}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {new Date(purchase.fecha).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {purchase.usuario.apellido}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {purchase.proveedor.nombre}
                      </TableCell>
                      <TableCell align="center" sx={styleTableCell}>
                        {getBOBCurrency(purchase.total)}
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
