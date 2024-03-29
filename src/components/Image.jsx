import PropTypes from 'prop-types';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function getRatio(ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 3 * 4)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '2/1': 'calc(100% /2)',
    '1/1': '100%',
  }[ratio];
}

export default function Image({ ratio, sx, src, alt, stylesImg, ...other }) {
  if (ratio) {
    return (
      <Box
        component="span"
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover', ...stylesImg, ...other }}
        />
      </Box>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
        ...sx,
      }}
    >
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', objectFit: 'cover', ...stylesImg, ...other }} />
    </Box>
  );
}

Image.propTypes = {
  ratio: PropTypes.oneOf(['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1', '2/1']),
  sx: PropTypes.object,
  src: PropTypes.string,
  alt: PropTypes.string,
  stylesImg: PropTypes.object,
};
// ----------------------------------------------------------------------
