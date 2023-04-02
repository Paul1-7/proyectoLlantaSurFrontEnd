import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, styled } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { CARDS_INFO } from '~/constants/shop';
import { useGetSlidersImagesQuery } from '~/redux/api/sliderImageApi';
import { PATH_MODULES } from '~/routes/paths';
import ShopSidebarMain from './ShopSidebarMain';
import ShopItemInfo from './ShopItemInfo';

const RootGrid = styled('section')(({ theme }) => ({
  display: 'grid',
  gap: '24px',
  gridTemplateRows: 'auto',
  [theme.breakpoints.down('md')]: {
    gridTemplateAreas: `"main main"
                       "footer footer"`,
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3,1fr)',
    gridTemplateAreas: `"sidebar  main main"
                       "sidebar  footer footer"`,
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4,1fr)',
    gridTemplateAreas: `"sidebar  main main main"
                       "sidebar  footer footer footer"`,
  },
}));

function ShopMainSection({ titleSidebar }) {
  const slidersImage = useGetSlidersImagesQuery();
  return (
    <RootGrid>
      <Card component="article" sx={{ gridArea: 'main', height: 'fit-content' }}>
        <Carousel
          autoPlay
          infiniteLoop
          swipeable
          showThumbs={false}
          useKeyboardArrows
          showStatus={false}
          swipeScrollTolerance={5}
          interval={4000}
          transitionTime={1200}
        >
          {!!slidersImage.data &&
            slidersImage.data
              .filter(({ estado }) => estado === 1)
              .map(({ id, idProd, urlImg }) => (
                <Box key={id}>
                  <Image ratio="16/9" src={urlImg} alt="imagen slider" stylesImg={{ height: '100%' }} />
                  <Button
                    LinkComponent={Link}
                    variant="contained"
                    to={`${PATH_MODULES.shop.products}/${idProd}`}
                    sx={{ position: 'absolute', bottom: 24, left: 24 }}
                  >
                    Compralo ahora
                  </Button>
                </Box>
              ))}
        </Carousel>
      </Card>
      <Card component="article" sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
        <ShopSidebarMain title={titleSidebar} />
      </Card>
      <Box
        component="article"
        sx={{
          gridArea: 'footer',
          display: 'grid',
          gap: '24px',
          height: '100%',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {CARDS_INFO.map(({ id, title, subtitle, icon }) => (
          <ShopItemInfo key={id} title={title} subtitle={subtitle} icon={icon} />
        ))}
      </Box>
    </RootGrid>
  );
}

ShopMainSection.propTypes = {
  titleSidebar: PropTypes.string.isRequired,
};

export default ShopMainSection;
