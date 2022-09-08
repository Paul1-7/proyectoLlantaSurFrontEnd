import React from 'react';
import { IconButton } from '@material-ui/core';
import { Article, Delete, Edit } from '@material-ui/icons';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DataTablesButtons = ({ id, buttons, setIsOpen }) => {
  const { remove, edit, detail } = buttons || {};
  const location = window.location.pathname;

  return (
    <>
      {detail && (
        <IconButton aria-label="detalle" LinkComponent={Link} to={`${location}/detalle/${id}`}>
          <Article color="secondary" />
        </IconButton>
      )}
      {edit && (
        <IconButton aria-label="modificar" LinkComponent={Link} to={`${location}/modificar/${id}`}>
          <Edit color="warning" />
        </IconButton>
      )}
      {remove && (
        <IconButton aria-label="eliminar" onClick={() => setIsOpen(true)}>
          <Delete color="error" />
        </IconButton>
      )}
    </>
  );
};

export default DataTablesButtons;

DataTablesButtons.propTypes = {
  buttons: PropTypes.shape({ remove: PropTypes.bool, edit: PropTypes.bool, detail: PropTypes.bool }),
  id: PropTypes.string
};
