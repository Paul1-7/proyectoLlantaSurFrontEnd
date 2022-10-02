import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Paper, Box, Typography } from '@material-ui/core';
// utils
import { fData } from '../../utils/formatNumber';
//
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
  onChange: PropTypes.func,
  onDrop: PropTypes.func
};

const message = {
  fileInvalidType: 'El tipo de imagen permitido es .jpg - .png - .svg - .webp '
};

export default function UploadSingleFile({ error, file, onChange, onDrop, sx, ...other }) {
  // const [file, setFile] = useState(null);
  console.log('TCL: UploadSingleFile -> file', file);

  const maxSize = 1000000;

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg']
    },
    validator: sizeValidator,
    maxFiles: 1,
    onDrop,
    ...other
  });

  function sizeValidator(file) {
    if (file.size > maxSize) {
      return {
        code: 'size-too-large',
        message: `El tamaño de la imagen tiene que ser menor a 1MB`
      };
    }
    return null;
  }

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.code === 'file-invalid-type' ? message.fileInvalidType : e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && { padding: '12% 0' })
        }}
      >
        <input {...getInputProps({ onChange })} />

        <UploadIllustration sx={{ width: 220, visibility: file ? 'hidden' : 'visible' }} />

        <Box sx={{ p: 3, ml: { md: 2 }, visibility: file ? 'hidden' : 'visible' }}>
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drop files here or click&nbsp;
            <Typography variant="body2" component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
              browse
            </Typography>
            &nbsp;thorough your machine
          </Typography>
        </Box>

        {file && (
          <Box
            component="img"
            alt="file preview"
            src={isString(file) ? file : file.preview}
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute',
              width: 'auto',
              height: 'calc(100% - 16px)'
            }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
