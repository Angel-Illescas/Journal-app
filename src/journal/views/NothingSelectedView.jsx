import { Bookmark,  } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Grid } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 64px - 60px)', backgroundColor: 'primary.main', borderRadius: 3 }}
    >

            <Grid item xs={12}>
                <Bookmark sx={{ fontSize: 100, color: "white" }}/>
            </Grid>

            <Grid item xs={12}>
                <Typography color='white' variant='h5'>Select an entry</Typography>
            </Grid>

        </Grid>
    )
}
