// ----------------------------------------------------------------------
export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        // ...printStyles,
        paragraph: {
          // ...printStyles,
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          // ...printStyles,
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
