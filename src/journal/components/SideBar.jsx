import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem"

export const SideBar = ({ drawerWidth }) => {

    const {notes} = useSelector(state=>state.journalGeneralState)
    const { displayName } = useSelector(state => state.authGeneralState)

    const firstName = displayName.split(" ")

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth, flexShrink: { sm: 0 }},   }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, 
                }}
            >

                <Toolbar >
                    <Grid container direction="column" alignItems="flex-start" >
                        <Typography variant="h6" color="primary.main">Welcome!</Typography>
                        <Typography variant="p" noWrap sx={{ mt: -1 }}  color="secondary.main">
                            {firstName[0] + " " + firstName[1]}
                        </Typography>
                    </Grid>
                </Toolbar>

                <Divider />

                <List >
                    {
                        notes.map((elem) =>
                            (<SideBarItem key={elem.id}  {...elem}/>))
                            
                        }
                </List>


            </Drawer>

        </Box>
    )
}
