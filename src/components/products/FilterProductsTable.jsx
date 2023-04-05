import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Stack, TextField } from '@mui/material';
import useAxios from '~/hooks/useAxios';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function customData({ data }) {
  const newData = data.map(({ nombre }) => nombre);
  return { data: newData };
}
function customDataBrands({ data }) {
  const newData = data.map(({ nombre }) => nombre);
  return { data: newData };
}

function FilterProductsTable({ setFilterData, rows = [] }) {
  const axiosPrivate = useAxiosPrivate();
  const [categoryValue, setCategoryValue] = useState('Ninguno');
  const [categoryInputValue, setCategoryInputValue] = React.useState('');
  const [brandValue, setBrandValue] = useState('Ninguno');
  const [brandInputValue, setBrandInputValue] = React.useState('');

  const [resGetCategories, , loadingGetCategories, axiosFetchGetCategories] = useAxios({
    responseCb: customData,
  });
  const [resGetBrands, , loadingGetBrands, axiosFetchGetBrands] = useAxios({
    responseCb: customDataBrands,
  });

  useEffect(() => {
    axiosFetchGetCategories({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: '/api/v1/categorias',
    });
    axiosFetchGetBrands({
      axiosInstance: axiosPrivate,
      method: 'GET',
      url: '/api/v1/marcas',
    });
  }, []);

  useEffect(() => {
    if (rows.length === 0) {
      setFilterData([]);
      return;
    }

    if ((categoryValue === 'Ninguno' && brandValue === 'Ninguno') || categoryValue === null || brandValue === null) {
      setFilterData(rows);
      return;
    }

    const dataFiltered = rows.filter(
      ({ categoria, marca }) =>
        (categoryValue === 'Ninguno' || categoria === categoryValue) &&
        (brandValue === 'Ninguno' || marca === brandValue),
    );
    setFilterData(dataFiltered);
  }, [categoryValue, brandValue, rows]);
  return (
    <Stack flexDirection="row" gap={2}>
      <Autocomplete
        autoComplete
        value={categoryValue}
        onChange={(event, newValue) => {
          setCategoryValue(newValue);
        }}
        inputValue={categoryInputValue}
        onInputChange={(event, newInputValue) => {
          if (newInputValue === '') {
            setCategoryValue('Ninguno');
          } else {
            setCategoryInputValue(newInputValue);
          }
        }}
        loading={loadingGetCategories}
        options={['Ninguno', ...resGetCategories]}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Filtrar por categorias" />}
        size="small"
      />
      <Autocomplete
        autoComplete
        value={brandValue}
        onChange={(event, newValue) => {
          setBrandValue(newValue);
        }}
        inputValue={brandInputValue}
        onInputChange={(event, newInputValue) => {
          if (newInputValue === '') {
            setBrandValue('Ninguno');
          } else {
            setBrandInputValue(newInputValue);
          }
        }}
        loading={loadingGetBrands}
        options={['Ninguno', ...resGetBrands]}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Filtrar por marcas" />}
        size="small"
      />
    </Stack>
  );
}

FilterProductsTable.propTypes = {
  setFilterData: PropTypes.func,
  rows: PropTypes.array,
};

export default FilterProductsTable;
