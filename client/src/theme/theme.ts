import { createTheme } from "@mui/material";

export const themeOptions = createTheme({
    palette: {
        primary: {
            main: "#1565c0",
        },
        secondary: {
            main: "#ff4081",
        },
        error: {
            main: "#d50000",
        },
        background: {
            default: "#ff0000",
        },
    },
});

export const tabsTheme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
});
