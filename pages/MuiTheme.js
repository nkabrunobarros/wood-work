import { createTheme } from '@mui/material';

function MuiTheme ({ ...props }) {
  const { selectedTheme, fontSize } = props;

  const sizes = {
    xs: 10,
    sm: 12,
    md: 14,
    xl: 18,
    xxl: 22,
    title: 28,
    titlexxl: 32,
  };

  const redTheme = {
    primary: {
      main: selectedTheme === 'light' ? '#E50000' : '#3F0000',
      dark: selectedTheme === 'light' ? '#3F0000' : '#3F0000',
      light: selectedTheme === 'light' ? '#ffe8e5' : '#ffe8e5',
      lightest: selectedTheme === 'light' ? '#E5000033' : '#3F000033',
    },
    default: {
      main: selectedTheme === 'light' ? '#fff' : '#282828',
      sides: selectedTheme === 'light' ? '#3F0000' : '#282828',
    },
    link: {
      main: selectedTheme === 'light' ? '#E50000' : '#E50000',
    },
  };

  const blueTheme = {
    primary: {
      main: selectedTheme === 'light' ? '#225EE8' : '#1b91e7',
      dark: selectedTheme === 'light' ? '#0c2254' : '#1b91e7',
      light: selectedTheme === 'light' ? '#1b91e7' : '#1b91e7',
      lightest: selectedTheme === 'light' ? '#225EE833' : '#225EE833',
    },
    default: {
      main: selectedTheme === 'light' ? '#fff' : '#282828',
      sides: selectedTheme === 'light' ? '#0c2254' : '#282828',
    },
    lightGray: {
      main: selectedTheme === 'light' ? 'var(--grayBG)' : '#383838',
    },
    lightTextSm: {
      main: selectedTheme === 'light' ? '#8c8c8c' : 'rgba(255, 255, 255, 0.7)',
      black: selectedTheme === 'light' ? 'black' : 'var(--white)',
      dark: selectedTheme === 'light' ? 'black' : 'var(--white)',
    },
    link: {
      main: selectedTheme === 'light' ? 'var(--primary)' : 'var(--babyblue)',
    },
    messages: {
      sender: selectedTheme === 'light' ? 'var(--primary)' : 'var(--babyblue)',
      receiver: selectedTheme === 'light' ? '#E4E6EB' : '#3E4042',
    }
  };

  const currentClient = 'Etos';
  let colorScheme = blueTheme;

  if (currentClient === 'Etos') colorScheme = blueTheme;
  else if (currentClient === 'red') colorScheme = redTheme;
  else colorScheme = blueTheme;

  const theme = createTheme({
    palette: {
      mode: selectedTheme,
      primary: {
        main: colorScheme.primary.main,
        dark: colorScheme.primary.dark,
        light: colorScheme.primary.light,
        lightest: colorScheme.primary.lightest,
      },
      default: {
        main: colorScheme.default.main,
        sides: colorScheme.default.sides,
      },
      lightGray: {
        main: selectedTheme === 'light' ? 'var(--grayBG)' : '#383838',
        edges: selectedTheme === 'light' ? '#EDEDED' : '#3B3B3B',
        secondary: selectedTheme === 'light' && '#FAFAFA'
      },
      collapseImg: {
        main: selectedTheme === 'light' ? 'red' : 'red',
      },
      lightTextSm: {
        main: selectedTheme === 'light' ? '#8c8c8c' : 'rgba(255, 255, 255, 0.7)',
        black: selectedTheme === 'light' ? 'black' : 'var(--white)',
        dark: selectedTheme === 'light' ? 'black' : 'var(--white)'
      },
      link: {
        main: colorScheme.link.main,
      },
      messages: {
        sender: selectedTheme === 'light' ? 'var(--primary)' : 'var(--babyblue)',
        receiver: selectedTheme === 'light' ? '#E4E6EB' : '#3E4042',
      }
    },
    //  Muda a shape de todos os obj incluido inputs
    // shape: {
    //     borderRadius: '8px'
    // },
    typography: {
      fontFamily: 'Montserrat',
      fontSize: sizes[fontSize],
      xs: { fontSize: sizes.xs },
      sm: { fontSize: sizes.sm },
      md: { fontSize: sizes.md },
      xl: { fontSize: sizes.xl },
      xxl: { fontSize: sizes.xxl },
      title: { fontSize: sizes.title, fontWeight: 'bold' },
      titlexxl: { fontSize: sizes.titlexxl, fontWeight: 'bold' },
    },
    TextareaAutosize: {
      fontFamily: 'Montserrat',
      backgroundColor: selectedTheme === 'light' ? 'white' : '#282828',
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme === 'light' ? 'white' : '#282828',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme === 'light' ? 'white' : '#282828',
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme === 'light' ? 'white' : '#282828',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            width: '100%'
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme === 'light' && 'var(--grayBG)'
          }
        }
      },
      MuiTextareaAutosize: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme === 'light' ? 'white' : '#282828',
          }
        }
      },
    },
  });

  return { ...theme };
}

export default MuiTheme;
