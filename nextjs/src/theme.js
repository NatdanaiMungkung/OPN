import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab'
  },
  palette: {
    primary: {
      main: '#fff'
    },
    error: {
      main: red.A400
    }
    // text: {
    //   primary: '#fff',
    //   secondary: '#000'
    // }
  }
});

export default theme;
