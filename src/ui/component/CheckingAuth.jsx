import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

export const CheckingAuth = () => {

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', minWidth: '100vw', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid
                item
                xs={3}
                sx={{ display: 'flex', justifyContent: 'center', padding: 3, borderRadius: 5, width: { md: 450 } }}
            >
                <CircularProgress color="secondary" />
            </Grid>
        </Grid>

    )
}
