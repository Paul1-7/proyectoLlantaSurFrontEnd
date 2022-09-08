import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, IconButton, Typography } from '@material-ui/core';
import BadgeStatus from '../../components/BadgeStatus';
import Label from '../../components/Label';
import useAxios from '../../hooks/useAxios';
import Page from '../../components/Page';
import axios from '../../apis/apis';
import useSettings from '../../hooks/useSettings';
import BreadcrumbsCustom from '../../components/BreadcrumbsCustom';

export default function FormularioCliente({ title }) {
  const { themeStretch } = useSettings();
  return (
    <Page title={title}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BreadcrumbsCustom />
        <Typography variant="h3" component="h1" paragraph>
          {title}
        </Typography>
        <Typography gutterBottom>Agrega un nuevo cliente</Typography>
        <Label color="success">Activo</Label>
      </Container>
    </Page>
  );
}

FormularioCliente.propTypes = {
  title: PropTypes.string.isRequired
};
