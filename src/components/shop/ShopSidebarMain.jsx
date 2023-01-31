import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '~/redux/api/categoriesApi';
import { useSnackbar } from 'notistack';
import { DEFAULT_CONFIG_NOTISTACK } from '~/utils/dataHandler';
import { ERRORS } from '~/constants/handleError';

function ShopSidebarMain({ title }) {
  const { enqueueSnackbar } = useSnackbar();
  const categories = useGetCategoriesQuery();

  useEffect(() => {
    if (!categories.isError) return;
    enqueueSnackbar(ERRORS.FETCH_ERROR, {
      ...DEFAULT_CONFIG_NOTISTACK,
      variant: 'error',
    });
  }, [categories.isError]);

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
