import { ExpandMoreRounded } from '@mui/icons-material';

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRounded,
      },

      styleOverrides: {
        root: {},
      },
    },
  };
}
