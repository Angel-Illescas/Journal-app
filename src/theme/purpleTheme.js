import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#247BA0'
        },
        secondary: {
            main: '#37123C',
            alt: '#71677C'
        },
        error: {
            main: red.A400
        },
        tercy: {
            main: '#FB3640'
        }
    },
    typography: {
        fontFamily: "Quicksand, sans-serif",
        fontWeight: 600, // Ajusta el valor según tu preferencia (100-900)
    },
})

