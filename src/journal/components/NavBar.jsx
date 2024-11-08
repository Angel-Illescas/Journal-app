import { AppBar, IconButton, Toolbar, Grid, Typography, Box } from "@mui/material"
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { useDispatch } from 'react-redux';
import { starlogoutWithFirebase } from "../../store/auth/thunks";

export const NavBar = ({ drawerWidth = 240 }) => {



    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(starlogoutWithFirebase())
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{
                        mr: 2,
                        display: {
                            sm: 'none'
                        }
                    }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Box
                        component="img"
                        src="/assets/img/Aurnel-logo-bgLight.svg"
                        alt="JournalApp Logo"
                        sx={{ height: 30 }} // Ajusta el tamaño de la imagen según necesites
                    />
                    <IconButton color="white" onClick={handleLogOut}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}
