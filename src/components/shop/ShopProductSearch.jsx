import { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';

// routes
import { PATH_MODULES } from '~/routes/paths';
// components
import Image from '~/components/Image';
import Iconify from '~/components/Iconify';
import InputStyle from '~/components/forms/InputStyle';
import SearchNotFound from '~/components/SearchNotFound';
import { useNavigate } from 'react-router';
import { useGetProductsQuery } from '~/redux/api/productApi';

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: { xs: '100%', sm: '280px' },
});

export default function ShopProductSearch({ sx = {} }) {
  const navigate = useNavigate();
  const products = useGetProductsQuery();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = (value) => {
    const productsMatched = products.data
      ?.filter(({ nombre }) => nombre.toLowerCase().includes(value.toLowerCase()))
      .map(({ id, nombre, imagen }) => ({ id, nombre, imagen }));

    setSearchResults(productsMatched);

    setSearchQuery(value);
  };

  const handleClick = (id) => {
    navigate(`${PATH_MODULES.shop.products}/${id}`);
  };

  const handleKeyUp = (event) => {
    const { id } = searchResults.at(0);
    if (event.key === 'Enter') {
      handleClick(id);
    }
  };

  return (
    <Autocomplete
      sx={sx}
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(_, value) => handleChangeSearch(value)}
      getOptionLabel={(product) => product.nombre}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          size="small"
          {...params}
          placeholder="Buscar producto..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { nombre, imagen, id } = product;
        const matches = match(nombre, inputValue);
        const parts = parse(nombre, matches);
        return (
          <li {...props}>
            <Image alt={imagen} src={imagen} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} />
            <Link underline="none" onClick={() => handleClick(id)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}

ShopProductSearch.propTypes = {
  sx: PropTypes.object,
};
