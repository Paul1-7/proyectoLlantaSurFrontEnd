import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, Fragment, useContext, useState } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import Controls from '~/components/forms/Control';
import { MIconButton } from '~/components/@material-extend';
import { Clear } from '@mui/icons-material';
import DataTableContext from '~/contexts/DataTableContext';

const initialForm = {
  idProd: '',
  nombre: '',
  cantMax: '1',
  precio: '',
};

function ProductsDiscounts({ data = null, products = [], existDataToLoad = false }) {
  const [dataLoaded, setDataLoaded] = useState(!existDataToLoad);
  const { control } = useFormContext();

  const { dataRow, enableButton, setDataToDisabledButton, resetDataRow } = useContext(DataTableContext);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productos',
  });
  const watchProducts = useWatch({ name: 'productos' });

  function getMaxStockSubsidiaries(data) {
    const product = { ...data };

    delete product.id;
    delete product.nombre;
    delete product.precioVenta;
    const subsidiaries = Object.entries(product);
    const stockSubsidiaries = subsidiaries.map(([, stock]) => stock);
    return Math.max(...stockSubsidiaries);
  }

  useEffect(() => {
    if (!dataRow || !dataLoaded) return;

    const maxStock = getMaxStockSubsidiaries(dataRow);

    append({
      ...initialForm,
      nombre: dataRow.nombre,
      idProd: dataRow.id,
      maxStock,
      precioVenta: dataRow.precioVenta,
    });
    resetDataRow();
  }, [dataRow, dataLoaded]);

  useEffect(() => {
    if (!data) return;
    const productsFounds = [];
    data.forEach(({ idProd, cantMax, precio, producto }) => {
      const productFounded = products.find(({ id }) => id === idProd);
      productsFounds.push(productFounded);
      const maxStock = getMaxStockSubsidiaries(productFounded);
      append({ idProd, cantMax, precio, nombre: producto.nombre, precioVenta: producto.precioVenta, maxStock });
    });
    setDataToDisabledButton(productsFounds);
    setDataLoaded(true);
  }, [data]);

  return (
    <>
      <Box>
        <Typography variant="subtitle1" gutterBottom align="center">
          Productos para el descuento
        </Typography>
      </Box>

      {fields.length ? (
        <Box sx={{ marginTop: '16px' }}>
          {fields.map((item, index) => (
            <Grid container wrap="wrap" spacing={1} key={item.id} sx={{ position: 'relative' }}>
              <Grid item xs={12} md={1} sx={{ textAlign: 'center' }}>
                <MIconButton
                  aria-label="eliminar"
                  color="error"
                  onClick={() => {
                    const id = watchProducts?.[index].idProd;
                    remove(index);
                    enableButton(id);
                  }}
                >
                  <Clear color="error" />
                </MIconButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Input label="Producto" disabled name={`productos.${index}.nombre`} isArray />
              </Grid>
              <Grid item xs={12} md={2} sx={{ position: 'static' }}>
                <Controls.Input
                  label="Cantidad maxima"
                  name={`productos.${index}.cantMax`}
                  isArray
                  type="number"
                  HelperTextProps={{
                    sx: {
                      position: { md: 'absolute' },
                      left: { md: '-15rem', lg: '-17rem' },
                      bottom: '-1.2rem',
                      width: '20rem',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Controls.Input label="Precio" name={`productos.${index}.precio`} isArray />
              </Grid>
            </Grid>
          ))}
        </Box>
      ) : (
        <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="subtitle2">No hay productos seleccionados</Typography>
        </Box>
      )}
    </>
  );
}
export default ProductsDiscounts;

ProductsDiscounts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.arrayOf(PropTypes.object),
  existDataToLoad: PropTypes.bool,
};
