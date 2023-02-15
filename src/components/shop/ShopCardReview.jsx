import { Box, Rating, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { formatDateToLocal } from '~/utils/dataHandler';
import { Delete, Edit } from '@mui/icons-material';
import { MIconButton } from '../@material-extend';

function ShopCardReview({ data }) {
  const { user, rating, title, description, date } = data;

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction={{ xs: 'row' }} gap={{ xs: 0.2, xsm: 1, md: 1.4 }} alignItems={{ xs: 'center' }} flexWrap="wrap">
        <Typography variant="caption">{user}</Typography>
        <Typography variant="caption">{formatDateToLocal(date)}</Typography>
        <Stack direction="row" alignItems="center" gap={0.2}>
          <MIconButton size="small">
            <Edit />
          </MIconButton>
          <MIconButton size="small">
            <Delete />
          </MIconButton>
        </Stack>
      </Stack>
      <Stack direction="row" gap={2}>
        <Rating name="read-only" value={rating} readOnly size="small" />
        <Typography variant="body1">{title}</Typography>
      </Stack>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
}

ShopCardReview.propTypes = {
  data: PropTypes.object,
};
export default ShopCardReview;
