import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, styled } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import Image from 'components/Image';
import ShopSidebarMain from './ShopSidebarMain';

const RootGrid = styled('section')(({ theme }) => ({
  display: 'grid',
  gap: '24px',
  gridTemplateRows: 'auto',
  [theme.breakpoints.down('md')]: {
    gridTemplateAreas: `"main main"
                       "footer footer"`
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3,1fr)',
    gridTemplateAreas: `"sidebar  main main"
                       "sidebar  footer footer"`
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4,1fr)',
    gridTemplateAreas: `"sidebar  main main main"
                       "sidebar  footer footer footer"`
  }
}));

const ShopMainSection = ({ items, titleSidebar }) => {
  const a = 0;
  return (
    <RootGrid>
      <Card component="article" sx={{ gridArea: 'main' }}>
        <Carousel
          autoPlay
          infiniteLoop
          swipeable
          showThumbs={false}
          useKeyboardArrows
          showStatus={false}
          swipeScrollTolerance={5}
          interval={4000}
          transitionTime={1000}
        >
          <Box>
            <Image
              ratio="2/1"
              src="https://res.cloudinary.com/paul1-7/image/upload/v1674055674/llanta-sur/ofertas/oferta_llanta_qkqunn.webp"
              alt="s"
            />
            <Button LinkComponent={Link} variant="outlined" to="#" sx={{ position: 'absolute', top: 0 }}>
              Compralo ahora
            </Button>
          </Box>
          <Box>
            <Image
              ratio="2/1"
              src="https://res.cloudinary.com/paul1-7/image/upload/v1674055674/llanta-sur/ofertas/oferta_llanta_qkqunn.webp"
              alt="s"
            />
            <Button LinkComponent={Link} variant="outlined" to="#" sx={{ position: 'absolute', top: 0 }}>
              Compralo ahora
            </Button>
          </Box>
        </Carousel>
      </Card>
      <Card component="article" sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
        <ShopSidebarMain title={titleSidebar} />
      </Card>
      <Card component="article" sx={{ gridArea: 'footer', bgcolor: 'warning.dark' }}>
        Footer
      </Card>
    </RootGrid>
  );
};

ShopMainSection.propTypes = {
  titleSidebar: PropTypes.string.isRequired
};

export default ShopMainSection;
