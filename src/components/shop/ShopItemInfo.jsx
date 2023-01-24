import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';

function ShopItemInfo({ title, subtitle, icon }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '1rem',
      }}
    >
      {icon}
      <Typography
        variant="h6"
        component="h5"
        textTransform="uppercase"
        textAlign="center"
        sx={{
          fontSize: {
            xs: '13px',
            sm: '14px',
            md: '17px',
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        component="h6"
        textAlign="center"
        sx={{
          fontSize: {
            xs: '11px',
            sm: '11px',
            md: '12px',
          },
        }}
      >
        {subtitle}
      </Typography>
    </Card>
  );
}

ShopItemInfo.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
};

export default ShopItemInfo;
