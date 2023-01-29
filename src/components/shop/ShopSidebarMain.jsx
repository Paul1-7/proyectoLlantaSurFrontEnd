import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '~/redux/api/categoriesApi';
import { useSnackbar } from 'notistack';
import { DEFAULT_CONFIG_NOTISTACK } from '~/utils/dataHandler';

function ShopSidebarMain({ title }) {
  const { enqueueSnackbar } = useSnackbar();
  const categories = useGetCategoriesQuery();

  if (categories.isError) {
    const msg = categories.error.error;

    enqueueSnackbar(msg, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }

  return (
    <nav>
      <List
        subheader={
          <ListSubheader component="h2" sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
            {title}
          </ListSubheader>
        }
      >
        {categories.isSuccess &&
          categories.data?.map(({ nombre }, index) => (
            <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }} key={index}>
              <ListItemButton LinkComponent={Link} to={`/shop/${nombre.toLowerCase()}`}>
                <ListItemText primary={nombre} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </nav>
  );
}

ShopSidebarMain.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ShopSidebarMain;
