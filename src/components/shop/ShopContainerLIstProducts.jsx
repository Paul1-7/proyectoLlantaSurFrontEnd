import { Container, Typography } from '@mui/material';
import React from 'react';
import { LoadingScreen, Page } from '~/components';
import PropTypes from 'prop-types';

function ShopContainerListProducts({ loading = false, error = null, children, title = '', titleContainer }) {
  return (
    <Page title={title}>
      {loading && !error && <LoadingScreen />}
      {!loading && (
        <Container sx={{ margin: { xs: '9rem 0rem 2rem 0rem', xl: '9rem 4rem 2rem 4rem' } }} maxWidth="xl">
          {titleContainer && <Typography variant="h3">{titleContainer}</Typography>}
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
  titleContainer: PropTypes.string,
};

export default ShopContainerListProducts;
