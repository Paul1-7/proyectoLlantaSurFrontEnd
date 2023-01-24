import React from 'react';
import { Breadcrumbs, Link as LinkItem, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function BreadcrumbsCustom({ sx }) {
  const regexUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  const location = window.location.pathname.slice(1);
  const names = location.split('/').map((name) => name.charAt(0).toUpperCase() + name.slice(1));
  let route = '';

  const nameWhitoutId = names.filter((name) => !regexUUID.test(name));

  const sxNoPrint = {
    '@media print': {
      display: 'none',
    },
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '16px', ...sxNoPrint, ...sx }}>
      {nameWhitoutId.map((name, index) => {
        route += `/${name.toLowerCase()}`;
        if (index + 1 !== nameWhitoutId.length)
          return (
            <LinkItem
              key={index}
              underline="hover"
              color="inherit"
              component={Link}
              to={route}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {index === 0 && <DashboardIcon sx={{ marginRight: '8px' }} />}
              {name}
            </LinkItem>
          );
        return (
          <Typography key={index} color="text.primary">
            {name}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsCustom;

BreadcrumbsCustom.propTypes = {
  sx: PropTypes.object,
};
