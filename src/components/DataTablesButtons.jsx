import React, { useContext } from 'react';
import { Add, Article, Delete, Edit } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import DataTableContext from '~/contexts/DataTableContext';
import { MIconButton } from './@material-extend';

function DataTablesButtons({ data, buttons }) {
  const { remove, edit, detail, add } = buttons || {};
  const location = window.location.pathname;

  const { disableButton, disabledButtons, handleOpenDialog, setOpenDialog } = useContext(DataTableContext) || {};

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {detail && (
        <MIconButton aria-label="detalle" LinkComponent={Link} to={`${location}/detalle/${data.id}`}>
          <Article color="primary" />
        </MIconButton>
      )}
      {edit && (
        <MIconButton aria-label="modificar" LinkComponent={Link} to={`${location}/modificar/${data.id}`}>
          <Edit color="warning" />
        </MIconButton>
      )}
      {remove && (
        <MIconButton
          aria-label="eliminar"
          onClick={() => {
            setOpenDialog(true);
            handleOpenDialog(data.id);
          }}
        >
          <Delete color="error" />
        </MIconButton>
      )}
      {add && (
        <Button
          aria-label="agregar"
          size="small"
          onClick={() => disableButton(data)}
          disabled={disabledButtons?.[data.id] || data.cantidad <= 0}
          startIcon={<Add />}
        >
          Agregar
        </Button>
      )}
    </div>
  );
}

export default DataTablesButtons;

DataTablesButtons.propTypes = {
  buttons: PropTypes.object,
  data: PropTypes.object,
};
