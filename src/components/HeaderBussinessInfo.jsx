import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function HeaderBussinessInfo({ data, sx }) {
  const { nombre, direccion, tel, ciudad } = data;
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Stack flexDirection="row" justifyContent="space-between">
        <img
          src="https://res.cloudinary.com/paul1-7/image/upload/v1681263211/llanta-sur/logoSURLLANTAS_ddismg.jpg"
          style={{ width: '10rem', height: '100%' }}
          alt="logo"
        />
        <Box>
          <Typography variant="h4" align="center">
            {nombre}
          </Typography>
          <Typography align="center" variant="caption" sx={{ display: 'flex', mb: 1 }}>
            {direccion}
            <br />
            Telefono:{tel}
            <br />
            {ciudad}
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ borderColor: '#000' }} />
    </Box>
  );
}

HeaderBussinessInfo.propTypes = {
  data: PropTypes.object,
  sx: PropTypes.object,
};

export default HeaderBussinessInfo;
