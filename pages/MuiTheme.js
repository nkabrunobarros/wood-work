import { createTheme } from "@mui/material";

function MuiTheme({ ...props }) {
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

    const theme = createTheme({
        palette: {
            mode: selectedTheme,
            primary: {
                main: selectedTheme === 'light' ? '#225EE8' : '#1b91e7',
            },
            default: {
                main: selectedTheme === 'light' ? '#fff' : '#282828',
            },
            lightGray: {
                main: selectedTheme === 'light' ? 'var(--grayBG)' : '#383838',
            },
            collapseImg: {
                main: selectedTheme === 'light' ? 'red' : 'red',
            },
            lightTextSm: {
                main: selectedTheme === 'light' ? '#8c8c8c' : 'rgba(255, 255, 255, 0.7)',
                black: selectedTheme === 'light' ? 'black' : 'var(--white)'
            },
            link: {
                main: selectedTheme === 'light' ? 'var(--primary)' : 'var(--babyblue)',
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

    return theme;
}

export default MuiTheme;