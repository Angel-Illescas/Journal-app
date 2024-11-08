import { Typography, TextField, Button, Link, Alert, Box } from "@mui/material"
import { Link as LinkRouter } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout";
import { Grid } from "@mui/material"
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { starCreateUserWithEmailPassword } from "../../store/auth/thunks";

const dataForm = {
  displayName: "",
  email: "",
  password: "",
}

export const RegisterPage = () => {

  const [deaultFormState, setDeaultFormState] = useState(false)
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.authGeneralState)

  const isChecking = useMemo(() => status === "checking" ? true : false, [status])


  const formValidated = {
    email: [(value) => value.includes('@'), "@ is required."],
    password: [(value) => value.length >= 6, "Password must contain more than 6 characters."],
    displayName: [(value) => value.length >= 1, "Complete name is required."]
  }

  const { formState, email, password, displayName, onInputChange,
    formValidatedState, isemailValid, ispasswordValid, isdisplayNameValid, isFormValidated
  } = useForm(dataForm, formValidated)


  console.log(formValidatedState);
  console.log(isFormValidated);
  console.log(isdisplayNameValid);

  const HandleOnSubmitRegister = (e) => {
    e.preventDefault()
    setDeaultFormState(true)
    if (!isFormValidated) return;
    dispatch(starCreateUserWithEmailPassword(formState))

  }



  return (
    <AuthLayout bgColor='secondary.main'>
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
      <Typography align="center" variant="h5" color="secondary" sx={{ mt: 2 }}>Register for Aurnel App</Typography>
      <form onSubmit={HandleOnSubmitRegister}>
        <Grid container >
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              onChange={onInputChange}
              label="Name"
              type="text"
              placeholder="John Doe"
              fullWidth
              name="displayName"
              value={displayName}
              error={!!isdisplayNameValid && deaultFormState}
              helperText={isdisplayNameValid} /
            >
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              onChange={onInputChange}
              label="Email"
              type="email"
              placeholder="correo-demo@gmail.com"
              fullWidth
              name="email"
              value={email}
              error={!!isemailValid && deaultFormState}
              helperText={isemailValid} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              onChange={onInputChange}
              label="Password"
              type="password"
              placeholder="*********"
              fullWidth
              name="password"
              value={password}
              error={!!ispasswordValid && deaultFormState}
              helperText={ispasswordValid} />
          </Grid>

          <Grid container display={!!errorMessage ? "" : "none"} spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Alert severity="error" >{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} >
              <Button variant="contained" color="primary" fullWidth type="submit" disabled={isChecking} sx={{color:'white'}}>
              Create an account
              </Button>
            </Grid>



            <Grid container direction="row" justifyContent='end' sx={{ mt: 2 }}>
              <Typography color='secondary.alt'>Do you already have an account? <Link component={LinkRouter} color="secondary.main" to="/auth/login" >Log in
              </Link>
              </Typography>
            </Grid>


          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
