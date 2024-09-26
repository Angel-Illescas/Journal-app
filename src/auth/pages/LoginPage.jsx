import { Typography, TextField, Button, Link, Alert } from "@mui/material"
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
    <AuthLayout title="LOGIN">

      <form onSubmit={handleOnSubmit}>
        <Grid container >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo-demo@gmail.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
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
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" fullWidth onClick={handleGoogleSignIn} disabled={status == "checking" ? true : false}>
                <GoogleIcon />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>


            <Grid container direction="row" justifyContent='end' sx={{ mt: 1 }}>
              <Link component={LinkRouter} to="/auth/register" >  Crear una cuenta
              </Link>
            </Grid>


          </Grid>

        </Grid>
      </form>
    </AuthLayout>




  )
}
