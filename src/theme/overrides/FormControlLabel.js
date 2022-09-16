// --------------------------------------------------------------------
export default function FormControlLabel(theme) {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary
        }
      }
    }
  };
}
