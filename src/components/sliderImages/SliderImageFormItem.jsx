import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { ITEMS_RADIO_GROUP } from '~/constants/items';
import { useFormContext } from 'react-hook-form';
import { TABLE_STATES } from '~/constants/dataTable';
import Controls from '../forms/Control';
import Image from '../Image';
import Label from '../Label';

function SliderImageFormItem({ product, allProducts, index }) {
  const { watch } = useFormContext();
  const valuesWatched = watch('sliders');
  const states = TABLE_STATES.active;
  const nameProduct = valuesWatched[index].idProd.nombre;
  const state = valuesWatched[index].estado;
  const { urlImg } = product;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="formulario de slider de producto">
        <Typography sx={{ mr: 2 }}>{nameProduct}</Typography>
        <Label color={states[state].variant}>{states[state].name}</Label>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container wrap="wrap" spacing={2}>
          <Grid item xs={12} md={6}>
            <Controls.Input label="Url de la imagen" name={`sliders.${index}.urlImg`} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controls.Autocomplete label="Producto" name={`sliders.${index}.idProd`} items={allProducts} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controls.RadioGroup label="Estado" name={`sliders.${index}.estado`} items={ITEMS_RADIO_GROUP} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Image ratio="16/9" src={urlImg} alt="imagen slider" stylesImg={{ height: '100%' }} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

SliderImageFormItem.propTypes = {
  product: PropTypes.object,
  allProducts: PropTypes.array,
  index: PropTypes.number,
};

export default SliderImageFormItem;
