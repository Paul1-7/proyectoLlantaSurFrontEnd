import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Typography, Container, styled } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '~/components/animate';
import Page from '~/components/Page';
import PageUnauthorizedIllustration from '~/assets/illustration_unauthorized';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Unauthorized() {
  return (
    <RootStyle title="No estas autorizado">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                ¡No estas autorizado para esta función del sistema!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Si necesitas acceder a esta funcionalidad, contacta con el administrador para que se te asigne los
              permisos correspondientes
            </Typography>

            <motion.div variants={varBounceIn}>
              <PageUnauthorizedIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
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
