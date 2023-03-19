import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Link, Divider, Container, Typography, IconButton, Stack, styled, Box } from '@mui/material';
//
import Logo from '~/components/Logo';
import { Facebook, WhatsApp } from '@mui/icons-material';
import { PATH_MODULES } from '~/routes/paths';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: <Facebook /> },
  { name: 'Whatsapp', icon: <WhatsApp /> },
];

const LINKS = [
  {
    headline: 'Tienda',
    children: [
      { name: 'Sobre nosotros', href: PATH_MODULES.staticPages.about },
      { name: 'Preguntas frecuentes', href: PATH_MODULES.staticPages.frequentlAskedQuestions },
    ],
  },
  {
    headline: 'Politicas',
    children: [
      { name: 'Garantias', href: PATH_MODULES.staticPages.warranties },
      { name: 'Devoluciones y cambios', href: PATH_MODULES.staticPages.devolutions },
      { name: 'Términos y condiciones', href: PATH_MODULES.staticPages.termConditions },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={8} md={3}>
            <Box>
              <Logo sx={{ mx: { xs: 'auto' } }} />
              <Typography variant="body2" align="center">
                Mantén tu vehículo seguro y en óptimo estado con nuestros repuestos
              </Typography>
            </Box>

            <Stack spacing={1.5} direction="row" justifyContent={{ xs: 'center' }} sx={{ mt: 5, mb: { xs: 5, md: 0 } }}>
              {SOCIALS.map((social) => (
                <IconButton key={social.name} color="primary" sx={{ p: 1 }}>
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline">
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'block' }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: 'center' },
          }}
        >
          © {new Date().getFullYear()} Todos los derechos reservados
        </Typography>
      </Container>
    </RootStyle>
  );
}
