import { Container, Typography } from '@mui/material';
import React from 'react';
import { LoadingScreen, Page } from '~/components';
import PropTypes from 'prop-types';

function ShopContainerListProducts({ loading, error, children, title = '' }) {
  return (
    <Page title={title}>
      {loading && !error && <LoadingScreen />}
      {!loading && !error && (
        <Container sx={{ margin: { xs: '8rem 0rem 2rem 0rem', xl: '6rem 4rem 2rem 4rem' } }} maxWidth="xl">
          <Typography variant="h3">{title}</Typography>
          {children}
        </Container>
      )}
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
