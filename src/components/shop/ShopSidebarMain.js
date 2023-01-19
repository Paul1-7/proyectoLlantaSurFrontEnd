import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ShopSidebarMain = ({ title }) => (
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

ShopSidebarMain.propTypes = {
  title: PropTypes.string.isRequired
};

export default ShopSidebarMain;
