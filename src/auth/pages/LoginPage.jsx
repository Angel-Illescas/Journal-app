import { Typography, TextField, Button, Link, Alert, Box } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { Link as LinkRouter } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout";
import { Grid } from "@mui/material"
import { useForm } from "../../hooks";
import { starLoginWithEmailPassword, startGoogleSignin } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";


const formData = {
  email: "",
  password: "",
}


export const LoginPage = () => {

  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.authGeneralState)
  const { email, password, onInputChange } = useForm(formData)

  const handleOnSubmit = (event) => {
    event.preventDefault()
    dispatch(starLoginWithEmailPassword({ email, password }))
  }

  const handleGoogleSignIn = (event) => {
    event.preventDefault()
    console.log("google sign in");
    dispatch(startGoogleSignin())
  }

  const typeOfError = () => {
    return errorMessage == "Firebase: Error (auth/invalid-credential)."
      ? "Email o contraseña incorrecto"
      : "Contacte al admin"
  }



  return (
    <AuthLayout>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src="/assets/img/iconLogoBgSecondary.svg"
          alt="JournalApp Logo"
          sx={{ height: 50 }} // Ajusta el tamaño de la imagen según necesites
        />
      </Box>
      <Typography align="center" variant="h5" color="secondary" sx={{ mt: 2 }}>Log in Aurnel App</Typography>

      <form onSubmit={handleOnSubmit}>
        <Grid container >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="correo-demo@gmail.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="*********"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">
              {typeOfError()}
            </Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={status == "checking" ? true : false}>
                <Typography color="white" sx={{ ml: 1 }}>Continue</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={handleGoogleSignIn} disabled={status == "checking" ? true : false}>
                <GoogleIcon sx={{ color: 'white' }} />
                <Typography color="white" sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>


            <Grid container direction="row" justifyContent='end' sx={{ mt: 2 }} >
            <Typography color='secondary.alt'>Don't have an account?</Typography><Link sx={{ ml: 1 }}component={LinkRouter} to="/auth/register" color="secondary">Create an account</Link>
            </Grid>


          </Grid>

        </Grid>
      </form>
    </AuthLayout>




  )
}
