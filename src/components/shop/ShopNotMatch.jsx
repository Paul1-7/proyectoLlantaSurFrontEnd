import { Box, Typography } from '@mui/material';
import React from 'react';
import illustrationNotMatch from '~/assets/illustrationGirlNotMatch.webp';
import Image from '../Image';

function ShopNotMatch() {
  return (
    <Box
      sx={{
        pt: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Image
        src={illustrationNotMatch}
        sx={{ width: { xs: '100%', sm: '80%', md: '50%', lg: '35%' } }}
        alt="illustration not match"
      />
      <Typography variant="h5" sx={{ width: { sm: '80%', md: '60%', lg: '50%' } }} align="center">
        No hay productos con los criterios que seleccionaste, puedes intentar con otros criterios para encontrar lo que
        buscas
      </Typography>
    </Box>
  );
}

export default ShopNotMatch;
