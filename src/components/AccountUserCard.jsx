import { Box, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { getNamesRolesFromIds } from '~/utils/dataHandler';
import Label from './Label';
import Avatar from './Avatar';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12],
}));

function AccountUserCard({ data, sx }) {
  const { name, roles } = data;
  const nameRoles = getNamesRolesFromIds(roles);
  return (
    <AccountStyle sx={sx}>
      <Avatar name={name} />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" align="center" sx={{ color: 'text.primary', mb: 2 }}>
          {name}
        </Typography>
        <Stack gap={1}>
          {nameRoles.map((rol) => (
            <Label key={rol} variant="filled">
              {rol}
            </Label>
          ))}
        </Stack>
      </Box>
    </AccountStyle>
  );
}
AccountUserCard.propTypes = {
  data: PropTypes.object,
  sx: PropTypes.object,
};

export default AccountUserCard;
