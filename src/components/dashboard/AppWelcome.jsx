import PropTypes from 'prop-types';
// material
import { styled, Typography, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '~/assets';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          Bienvenido de vuelta,
          <br /> {!displayName ? '...' : displayName}!
        </Typography>
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 260,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
}

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};
