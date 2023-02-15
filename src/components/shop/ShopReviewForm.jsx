import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import useAxios from '~/hooks/useAxios';
import schema from '~/schemas';
import { Clear, Save } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { Control, SnackBar } from '..';

const initialForm = {
  idCliente: '',
  idProd: '',
  titulo: '',
  descripcion: '',
  fecha: new Date(),
  calificacion: 0,
  estado: 1,
};

function ShopReviewForm({ handleOpen, handleClose }) {
  const [resPost, errorPost, loadingPost, axiosFetchPost] = useAxios();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(schema.reviews),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    console.log('TCL: onSubmit -> data', data);

    // axiosFetchPost({
    //   axiosInstance: axios,
    //   method: 'POST',
    //   url: `/api/v1/reviews`,
    //   requestConfig: {
    //     ...data,
    //   },
    // });
  };

  useEffect(() => {
    if (Array.isArray(resPost) && errorPost) {
      const severity = 'error';

      enqueueSnackbar(errorPost?.message, {
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        autoHideDuration: 5000,
        content: (key, message) => <SnackBar id={key} message={message} severity={severity} />,
      });
    }
  }, [errorPost]);

  return (
    <Dialog open={handleOpen} onClose={handleClose}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
          <DialogTitle sx={{ pb: 2 }}>Valora este producto</DialogTitle>
          <DialogContent>
            <Grid container wrap="wrap" spacing={1} sx={{ p: 0.5 }}>
              <Grid item xs={12}>
                <Control.Rating label="Calificación" name="calificacion" />
              </Grid>
              <Grid item xs={12}>
                <Control.Input label="Titulo" name="titulo" />
              </Grid>

              <Grid item xs={12}>
                <Control.Input label="Descripción" name="descripcion" multiline rows={4} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" startIcon={<Clear />}>
              Cancelar
            </Button>
            <LoadingButton
              type="submit"
              loading={loadingPost}
              loadingPosition="start"
              variant="contained"
              startIcon={<Save />}
            >
              Enviar
            </LoadingButton>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}

ShopReviewForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.bool.isRequired,
};

export default ShopReviewForm;
