// material
import { Container, Typography } from '@material-ui/core';
// hooks
// components
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import Page from '../components/Page';
import useSettings from '../hooks/useSettings';

// ----------------------------------------------------------------------

export default function App() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let message = null;
    const severity = 'success';
    if (location.state?.message) {
      message = location.state.message;
      navigate(location.pathname, { replace: true });
    }

    if (message) {
      enqueueSnackbar(message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 4000,
        variant: severity
      });
      message = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Page title="Page Two | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Page Two
        </Typography>

        <Typography gutterBottom>
          Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod
          ligula urna in dolor. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus blandit leo
          ut odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id
          purus. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. In consectetuer turpis ut velit.
          Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.
          Vestibulum suscipit nulla quis orci. Nam commodo suscipit quam. Sed a libero.
        </Typography>
        <Typography>
          Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla ut metus varius laoreet. Curabitur
          ullamcorper ultricies nisi. Ut non enim eleifend felis pretium feugiat. Donec mi odio, faucibus at,
          scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque libero metus, condimentum nec, tempor a, commodo
          mollis, magna. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Cras dapibus.
        </Typography>
      </Container>
    </Page>
  );
}
