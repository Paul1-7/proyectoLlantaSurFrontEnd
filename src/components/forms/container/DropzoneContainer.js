import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { FormHelperText } from '@material-ui/core';
import UploadSingleFile from '../UploadSingleFile';

const Dropzone = ({ name }) => {
  const { setValue, watch, control } = useFormContext();

  const handleDropSingleFile = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          name,
          {
            ...file,
            preview: URL.createObjectURL(file)
          },
          { shouldValidate: true }
        );
      }
    },
    [setValue, name]
  );
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={() => <UploadSingleFile file={watch(name)} onDrop={handleDropSingleFile} />}
      />
      <FormHelperText required variant="outlined">
        si no se sube una imagen se asignara la imagen por defecto al producto
      </FormHelperText>
    </>
  );
};

export default Dropzone;

Dropzone.propTypes = {
  name: PropTypes.string.isRequired
};
