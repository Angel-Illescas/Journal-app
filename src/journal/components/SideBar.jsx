import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem"

export const SideBar = ({ drawerWidth }) => {

    const {notes} = useSelector(state=>state.journalGeneralState)
    const { displayName} = useSelector(state => state.authGeneralState)

    const formattedName = displayName ? displayName.split(" ").slice(0, 2).join(" ") : "";

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
                        <Typography variant="h6" color="primary.main" sx={{fontWeight:'600'}}>Welcome!</Typography>
                        <Typography variant="p" noWrap sx={{ mt: -1 }}  color="secondary.main">
                        {formattedName}
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
