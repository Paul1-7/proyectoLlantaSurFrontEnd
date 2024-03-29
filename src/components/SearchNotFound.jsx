import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontrado
      </Typography>
      <Typography variant="body2" align="center">
        No se encontraron resultados para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Intente usar con otras palabras o letras
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> Introduzca las palabras clave</Typography>
  );
}

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};
