import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';

function ShopSidebarMain({ title }) {
  return (
    <nav>
      <List
        subheader={
          <ListSubheader component="h2" sx={{ textAlign: 'center' }}>
            {title}
          </ListSubheader>
        }
      >
        <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <ListItemButton LinkComponent={Link} to="#">
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}

ShopSidebarMain.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ShopSidebarMain;
