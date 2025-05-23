'use client';

import { GlobalStylesProps, ThemeOptions, createTheme } from '@mui/material';
import Link from 'next/link';
import { grey } from '@mui/material/colors';

export const globalStyles: GlobalStylesProps['styles'] = (theme) => ({
  '*::-webkit-scrollbar-track': {
    backgroundColor: grey[200],
  },
  '*::-webkit-scrollbar': {
    width: 8,
    backgroundColor: '#F5F5F5',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: grey[500],
    borderRadius: 12,
  },
  'audio::-webkit-media-controls-enclosure': {
    borderRadius: 12,
  },
  a: {
    textDecoration: 'none !important',
  },
  '.MuiSvgIcon-root': {
    width: '1em',
    height: '1em',
  },
  '.radial': {
    background: `radial-gradient(
      96.3% 616.69% at 3.7% 82.29%,
      ${theme.palette.primary.main} 0%,
      ${theme.palette.primary.light} 33.75%,
      ${theme.palette.primary.light} 72.42%,
      ${theme.palette.primary.main} 100%
    )`,
    '&:hover': {
      background: `radial-gradient(
        96.3% 616.69% at 3.7% 82.29%,
        ${theme.palette.primary.main} 0%,
        ${theme.palette.primary.light} 33.75%,
        ${theme.palette.primary.light} 72.42%,
        ${theme.palette.primary.main} 100%
      )`,
    },
  },
});

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#9e30e3',
      dark: '#771be8',
      light: '#cd40ee',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#de3860',
      dark: '#db3560',
      light: '#ed5b87',
      contrastText: '#FFF',
    },
    background: {
      default: '#FFF',
      paper: '#f6f6f6',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: '2.375rem',
      lineHeight: 1.21,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.27,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.33,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.66,
    },
    overline: {
      lineHeight: 1.66,
    },
    button: {
      textTransform: 'capitalize',
    },
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      },
    },
    MuiBottomNavigationAction: {
      defaultProps: {
        component: Link,
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
             font-family: 'iransans';
              src: url('/assets/fonts/iransansWeb/woff/IRANSansWeb.woff') format('truetype');
             }`,
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1366,
      xl: 1536,
    },
  },
};

export const defaultTheme = createTheme({
  ...themeOptions,
});

export const persianTheme = createTheme({
  ...themeOptions,
  direction: 'rtl',
  typography: {
    fontFamily: "'iransans'," + defaultTheme.typography.fontFamily,
    ...themeOptions.typography,
  },
});
