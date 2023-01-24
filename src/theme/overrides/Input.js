// --------------------------------------------------------------------
export default function Input(theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.secondary },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.secondary,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.grey[500_16],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500_32],
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
