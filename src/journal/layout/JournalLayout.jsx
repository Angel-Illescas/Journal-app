import { Box } from '@mui/material'
import React from 'react'
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>

        <NavBar drawerWidth={ drawerWidth } />

        <SideBar drawerWidth={ drawerWidth }/>

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 5 , width: `calc(100% - ${drawerWidth}px)`, mt:"40px", height: 'calc(100vh% - 100px)'}}
        >
            

            { children }
            
        </Box>
    </Box>
  )
}
