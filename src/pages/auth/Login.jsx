import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Stack, Link, Alert, Typography, styled } from '@mui/material';
import { Page } from '~/components';
import { PATH_MODULES } from '~/routes/paths';
import { MHidden } from '~/components/@material-extend';
import LoginForm from '~/components/auth/LoginForm';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    marginTop: '9rem',
    justifyContent: 'space-around',
    gap: '1rem',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center',

  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hola, bienvenido de vuelta
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>
      <ContentStyle sx={{ mx: { xs: 'auto', md: 'none' }, mt: { xs: 6, md: 0 } }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              Inicia sesión en Llanta Sur
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Ingresa tus credenciales abajo.</Typography>
          </Box>
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          si realizaste una compra en la tienda física, tu usuario es tu CI/NIT con el cual realizaste la compra, y la
          contraseña es el número de télefono
        </Alert>
        <LoginForm />
        <MHidden width="smUp">
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            ¿No tienes una cuenta?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to={PATH_MODULES.auth.signUp}>
              Registrate aquí
            </Link>
          </Typography>
        </MHidden>
      </ContentStyle>
    </RootStyle>
  );
}
