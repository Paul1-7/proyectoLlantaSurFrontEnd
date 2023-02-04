import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import illustrationNotFound from '~/assets/illustrationGirlNotFound.webp';
import { PATH_MODULES } from '~/routes/paths';
import Image from '../Image';

function ShopNotFound() {
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
        src={illustrationNotFound}
        sx={{ width: { xs: '100%', sm: '80%', md: '50%', lg: '35%' } }}
        alt="illustration not match"
      />
      <Typography variant="h5" sx={{ width: { sm: '80%', md: '60%', lg: '50%' } }} align="center">
        No tenemos productos por el momento, haz clic en el botón para ver otros productos. ¡Gracias!
      </Typography>
      <Button LinkComponent={Link} variant="contained" color="primary" to={PATH_MODULES.shop.products} sx={{ mt: 2 }}>
        Ver otros productos
      </Button>
    </Box>
  );
}

export default ShopNotFound;
