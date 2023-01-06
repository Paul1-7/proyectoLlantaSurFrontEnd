// ----------------------------------------------------------------------
const printStyles = {
  '@media print': {
    color: '#000'
  }
};

export default function Grid() {
  return {
    MuiGrid: {
      styleOverrides: {
        root: {
          ...printStyles
        }
      }
    }
  };
}
