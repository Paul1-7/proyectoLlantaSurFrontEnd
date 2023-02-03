import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// material
import { Box, List, ListItemButton } from '@mui/material';

function NavItem({ item }) {
  const { title, path } = item;

  return (
    <NavLink to={path} style={{ textDecoration: 'none' }}>
      <ListItemButton sx={{ color: 'text.secondary', fontSize: '14px', paddingLeft: '2rem' }}>{title}</ListItemButton>
    </NavLink>
  );
}
NavItem.propTypes = {
  item: PropTypes.object,
};

export default function NavSection({ navConfig, ...other }) {
  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array,
};
