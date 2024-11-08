import {  Typography, Grid } from '@mui/material'
import React from 'react'

export const AuthLayout = ({ children, bgColor="primary.main"}) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: `${bgColor}`, padding: 4 }}>

            <Grid item
                className="box-shadow"
                xs={3}
                sx={{ backgroundColor: 'white', padding: 3, borderRadius: 5 , width:{md:450}}}
            >
                <Typography variant="h5" sx={{ mb: 1 }}></Typography>

                    {children}

            </Grid>
        </Grid>
    )
}
