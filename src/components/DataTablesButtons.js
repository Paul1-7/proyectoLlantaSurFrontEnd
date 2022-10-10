import React from 'react';
import { Article, Delete, Edit } from '@material-ui/icons';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MIconButton } from './@material-extend';

const DataTablesButtons = ({ id, buttons, handleDelete, setOpenDialog }) => {
  const { remove, edit, detail } = buttons || {};
  const location = window.location.pathname;

  return (
    <div style={{ display: 'flex' }}>
      {detail && (
        <MIconButton aria-label="detalle" LinkComponent={Link} to={`${location}/detalle/${id}`}>
          <Article color="primary" />
        </MIconButton>
      )}
      {edit && (
        <MIconButton aria-label="modificar" LinkComponent={Link} to={`${location}/modificar/${id}`}>
          <Edit color="warning" />
        </MIconButton>
      )}
      {/* () => setIsOpen(true) */}
      {remove && (
        <MIconButton
          aria-label="eliminar"
          onClick={() => {
            setOpenDialog(true);
            handleDelete(id);
          }}
        >
          <Delete color="error" />
        </MIconButton>
      )}
    </div>
  );
};

export default DataTablesButtons;

DataTablesButtons.propTypes = {
  buttons: PropTypes.shape({ remove: PropTypes.bool, edit: PropTypes.bool, detail: PropTypes.bool }),
  id: PropTypes.string,
  handleDelete: PropTypes.func,
  setOpenDialog: PropTypes.func
};
