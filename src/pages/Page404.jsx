import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Typography, Container, styled } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '~/components/animate';
import Page from '~/components/Page';
import { PageNotFoundIllustration } from '~/assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <RootStyle title="404 Page Not Found | Minimal-UI">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                ¡Pagina no encontrada!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Lo siento, no podemos encontrar la pagina que estas buscando. ¿Quizás has escrito mal la URL? Asegúrese de
              comprobar su escritura
            </Typography>

            <motion.div variants={varBounceIn}>
              <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
            </motion.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Ir a la pagina principal
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
