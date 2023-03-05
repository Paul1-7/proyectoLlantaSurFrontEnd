import { Avatar, Box, styled, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

function AccountUserCard({ data, sx }) {
  const { name, role } = data;
  return (
    <AccountStyle sx={sx}>
      <Avatar alt="My Avatar" src="/static/mock-images/avatars/avatar_default.jpg" />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {role}
        </Typography>
      </Box>
    </AccountStyle>
  );
}
AccountUserCard.propTypes = {
  data: PropTypes.object,
  sx: PropTypes.object,
};

export default AccountUserCard;
