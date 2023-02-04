import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { LoadingScreen, Page } from '~/components';
import PropTypes from 'prop-types';

function ShopContainerListProducts({ loading, error, children, title = '' }) {
  return (
    <Page title={title}>
      <Container sx={{ margin: { xs: '8rem 0rem 2rem 0rem', xl: '6rem 4rem 2rem 4rem' } }} maxWidth="xl">
        <Typography variant="h3">{title}</Typography>

        {loading && !error && (
          <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LoadingScreen sx={{ top: 0, left: 0, width: 1, zIndex: 9999, position: 'fixed' }} />
          </Box>
        )}

        {!loading && !error && children}
      </Container>
    </Page>
  );
}

ShopContainerListProducts.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default ShopContainerListProducts;
