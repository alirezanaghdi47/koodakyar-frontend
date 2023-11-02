import localFont from 'next/font/local';

//===== libraries =====//
import {responsiveFontSizes, createTheme, alpha, getContrastRatio} from "@mui/material";
import {faIR} from "@mui/material/locale";

//===== types =====//
export declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        info: true;
        error: true;
        warning: true;
        success: true;
        black: true;
        white: true;
    }
}

export declare module '@mui/material/Typography' {
    interface TypographyPropsColorOverrides {
        black: true;
        white: true;
        dark: true;
        light: true;
    }
}

export declare module '@mui/material/IconButton' {
    interface IconButtonPropsVariantOverrides {
        contained: true;
        outlined: true;
    }
}

export declare module "@mui/material/styles" {
    interface Palette {
        ternary: string;
        black: string,
        white: string,
        light: string,
        dark: string,
    }

    interface PaletteOptions {
        ternary: string;
        black: string,
        white: string,
        light: string,
        dark: string,
    }
}

const vazirFD = localFont({
    src: [
        {
            path: './../assets/fonts/Vazirmatn-FD-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './../assets/fonts/Vazirmatn-FD-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
    ]
});

let theme = createTheme({
    direction: "rtl",
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
    palette: {
        mode: "light",
        tonalOffset: 0.2,
        contrastThreshold: 3,
        common: {
            black: "#1f2937",
            dark: "#374151",
            light: "#f9fafb",
            white: "#f3f4f6"
        },
        text: {
            primary: "#1f2937",
            secondary: "#374151"
        },
        background: {
            paper: "#f9fafb",
            default: "#f3f4f6"
        },
        primary: {
            main: "#4f46e5",
        },
        secondary: {
            main: "#374151"
        },
        success: {
            main: "#009600"
        },
        error: {
            main: "#D20A00"
        },
        warning: {
            main: "#F7A827"
        },
        info: {
            main: "#0658A5"
        },
        ternary: {
            main: "#e5e7eb",
        },
        black: {
            main: "#1f2937"
        },
        white: {
            main: "#f3f4f6"
        },
    },
    shape: {
        borderRadius: 8
    },
    typography: {
        fontFamily: vazirFD.style.fontFamily,
    },
    shadows: [
        "none",
        "rgba(0, 0, 0, 0.18) 0px 2px 4px",
        "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        ...Array(21).fill("rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px")
    ],
}, faIR);

theme.components = {
    MuiUseMediaQuery: {
        defaultProps: {
            noSsr: true,
        },
    },
    MuiCssBaseline: {
        styleOverrides: {
            ul: {
                margin: 0,
                padding: 0,
            },
            li: {
                margin: 0,
                padding: 0,
                listStyleType: "none"
            },
            p: {
                margin: 0
            },
            video:{
                borderRadius: 8
            }
        }
    },
    MuiDayCalendar: {
        styleOverrides: {
            weekDayLabel: ({theme, ownerState}) => ({
                color: theme.palette.common.dark,
                fontSize: theme.typography.subtitle2.fontSize,
                fontWeight: "bold",
            }),
        }
    },
    MuiPickersToolbarText: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                color: theme.palette.common.black,
                fontWeight: "bold",
                "&.Mui-selected": {
                    color: theme.palette.primary.main,
                }
            }),
            separator: ({theme, ownerState}) => ({
                color: theme.palette.secondary.main,
            }),
        }
    },
    MuiDatePickerToolbar: {
        styleOverrides: {
            title: ({theme, ownerState}) => ({
                color: theme.palette.common.black,
                fontWeight:"bold"
            }),
        }
    },
    MuiPickersCalendarHeader: {
        styleOverrides: {
            label: ({theme, ownerState}) => ({
                color: theme.palette.common.black,
                fontWeight:"bold"
            }),
        }
    },
    MuiPickersYear: {
        styleOverrides: {
            yearButton: ({theme, ownerState}) => ({
                color: theme.palette.common.black,
                fontWeight:"bold",
                "&.Mui-selected": {
                    background: theme.palette.primary.main
                }
            }),
        }
    },
    MuiPickersDay: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                color: theme.palette.common.dark,
                fontWeight: "bold",
                border: 'none !important',
                "&.Mui-selected": {
                    background: `${theme.palette.primary.main}!important`,
                    color: `${theme.palette.getContrastText(theme.palette.primary.main)}!important`
                },
                "&:hover": {
                    background: alpha(theme.palette.primary.light, 0.24),
                },
            }),
            today: ({theme, ownerState}) => ({
                background: `${theme.palette.secondary.main}!important`,
                color: `${theme.palette.getContrastText(theme.palette.secondary.main)}!important`,
                "&:hover": {
                    background: theme.palette.secondary.main,
                    color: theme.palette.getContrastText(theme.palette.secondary.main),
                }
            })
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                "&::-webkit-scrollbar": {
                    display: "none ",
                },
                scrollbarWidth: "none ",
                msOverflowStyle: "none "
            })
        }
    },
    MuiPaginationItem:{
      styleOverrides:{
          root: ({theme, ownerState}) => ({
              fontWeight: "bold",
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main
          })
      }
    },
    MuiAccordion: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                width: "100%",
                background: theme.palette.background.default,
                borderRadius: theme.shape.borderRadius,
                boxShadow: "none",
                "&.Mui-expanded": {
                    background: theme.palette.primary.main
                },
                '&:before': {
                    display: 'none',
                },
            }),
        },
        defaultProps: {
            disableGutters: true
        }
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                justifyContent: "space-between",
                fontSize: theme.typography.subtitle2.fontSize,
                fontWeight: 'bold',
            }),
            content: ({theme, ownerState}) => ({
                flexGrow: "unset",
                color: theme.palette.text.primary,
                '&.Mui-expanded': {
                    color: theme.palette.getContrastText(theme.palette.primary.main),
                },
            }),
            expandIconWrapper: ({theme, ownerState}) => ({
                marginLeft: theme.spacing(2),
                color: theme.palette.text.primary,
                '&.Mui-expanded': {
                    color: theme.palette.getContrastText(theme.palette.primary.main),
                    transform: 'rotate(180deg)',
                },
            }),
        },
    },
    MuiAccordionDetails: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                color: theme.palette.getContrastText(theme.palette.primary.main),
                fontSize: theme.typography.caption.fontSize,
                fontWeight: 'bold',
                paddingRight: theme.spacing(2),
                paddingLeft: theme.spacing(2),
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
                borderTop: 'none',
            })
        }
    },
    MuiTabs: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                minHeight: "unset"
            }),
            indicator: {
                display: "none"
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "unset",
                height: "max-content",
                minHeight: "unset",
                fontSize: theme.typography.body2.fontSize,
                fontWeight: "bold",
                borderRadius: theme.shape.borderRadius,
                "&.Mui-selected": {
                    background: theme.palette.primary.main,
                    color: theme.palette.getContrastText(theme.palette.primary.main)
                }
            })
        },
        defaultProps: {
            disableRipple: true,
            disableTouchRipple: true,
            disableFocusRipple: true
        }
    },
    MuiFormControlLabel: {
        styleOverrides: {
            label: ({theme, ownerState}) => ({
                fontSize: theme.typography.body2.fontSize,
                fontWeight: "bold",
                color: theme.palette.common.dark
            })
        }
    },
    MuiBreadcrumbs: {
        styleOverrides: {
            separator: ({theme}) => ({
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1)
            })
        }
    },
    MuiButton: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                background: ownerState.variant === "text" ? "transparent" : theme.palette[ownerState.color].main,
                color: ownerState.variant === "text" ? theme.palette[ownerState.color].main : theme.palette.getContrastText(theme.palette[ownerState.color].main),
                borderRadius: theme.shape.borderRadius,
                fontWeight: "bold",
            })
        },
        defaultProps: {
            disableElevation: true,
            disableRipple: true
        }
    },
    MuiIconButton: {
        variants: [
            {
                props: {variant: "contained"},
                style: ({theme, ownerState}) => ({
                    background: theme.palette[ownerState.color].main,
                    color: theme.palette.getContrastText(theme.palette[ownerState.color].main),
                    borderRadius: theme.shape.borderRadius,
                })
            }
        ],
        defaultProps: {
            disableRipple: true
        }
    },
    MuiBackdrop: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                background: alpha(theme.palette.common.black, 0.80),
                "&.MuiBackdrop-invisible": {
                    background: "transparent",
                }
            })
        }
    },
    MuiModal: {
        defaultProps: {
            elevation: 2,
            disableAutoFocus: true,
            disableEnforceFocus: true,
        }
    },
    MuiDialog: {
        defaultProps: {
            disableAutoFocus: true,
            PaperProps: {
                elevation: 2
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                background: theme.palette[ownerState.color].main,
                color: theme.palette.getContrastText(theme.palette[ownerState.color].main),
                border: `1px solid ${theme.palette[ownerState.color].main}`,
                borderRadius: theme.shape.borderRadius,
                fontWeight: "bold",
            })
        }
    },
    MuiTextField: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                fontWeight: "bold",
            })
        },
        defaultProps: {
            size: "small"
        }
    },
    MuiInputBase: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                background: theme.palette.background.default,
                fontWeight: "bold",
                color: theme.palette.common.black,
                border: `2px solid ${theme.palette.ternary.main}!important`,
                borderRadius: theme.shape.borderRadius,
                "&.Mui-focused": {
                    border: `2px solid ${theme.palette.primary.main}!important`,
                }
            }),
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            notchedOutline: ({theme, ownerState}) => ({
                border: `none`,
            }),
        }
    },
    MuiSelect: {
        defaultProps: {
            MenuProps: {
                elevation: 2
            }
        }
    },
    MuiDrawer: {
        defaultProps: {
            PaperProps: {
                elevation: 2
            }
        }
    },
    MuiList: {
        defaultProps: {
            disablePadding: true
        }
    },
    MuiMenu: {
        styleOverrides: {
            paper: ({theme, ownerState}) => ({
                maxWidth: 320,
                maxHeight: "unset",
                marginTop: 0,
            }),
            list: ({theme, ownerState}) => ({
                "&::-webkit-scrollbar": {
                    display: "none ",
                },
                scrollbarWidth: "none ",
                msOverflowStyle: "none "
            })
        },
        defaultProps: {
            elevation: 2
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                minHeight: "unset",
                fontSize: theme.typography.body2.fontSize,
                fontWeight: "bold",
                color: theme.palette.common.black,
                "&.Mui-selected": {
                    background: `${theme.palette.primary.main} !important`,
                    color: `${theme.palette.getContrastText(theme.palette.primary.light)} !important`,
                    "&:hover": {
                        background: theme.palette.primary.light,
                    }
                }
            })
        }
    },
    MuiTooltip: {
        styleOverrides: {
            tooltip: ({theme, ownerState}) => ({
                background: theme.palette.primary.main,
                color: theme.palette.getContrastText(theme.palette.primary.main),
                fontSize: theme.typography.caption.fontSize,
                fontWeight: "bold",
            }),
            arrow: ({theme, ownerState}) => ({
                "&::before": {
                    background: theme.palette.primary.main,
                }
            })
        }
    },
    MuiPopover: {
        styleOverrides: {
            paper: ({theme, ownerState}) => ({
                maxHeight: 192
            }),
        }
    },
    MuiTableCell: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                padding: theme.spacing(1)
            }),
        }
    },
    MuiTablePagination: {
        styleOverrides: {
            toolbar: ({theme, ownerState}) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: 0
            }),
            selectLabel: ({theme, ownerState}) => ({
                color: theme.palette.common.black,
                fontWeight: "bold",
            }),
            displayedRows: ({theme, ownerState}) => ({
                color: theme.palette.common.black,
                fontWeight: "bold",
                marginLeft: "auto"
            }),
            select: ({theme, ownerState}) => ({
                width: 16,
                marginLeft: 0,
            }),
            menuItem: ({theme, ownerState}) => ({
                fontSize: theme.typography.subtitle2.fontSize,
                fontWeight: "bold",
            }),
        }
    },
    MuiSkeleton: {
        styleOverrides: {
            root: ({theme, ownerState}) => ({
                background: theme.palette.ternary.main
            }),
        }
    }
}

theme = responsiveFontSizes(theme);

export default theme;