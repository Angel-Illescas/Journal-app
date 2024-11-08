import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette:{
        primary: {
            main: '#ff7300'
        },
        secondary:{
            main: '#37123C',
            alt:'#71677C'
        },
        error:{
            main: red.A400
        }
    }
})

