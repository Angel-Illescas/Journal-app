import { loginWithEmailPassword, logoutFirebase, registerUserPassEmail, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

    }
}

export const startGoogleSignin = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await signInWithGoogle()
        console.log({ result });
        if (!result.ok) return dispatch(logout(result.errorMessage))
        return dispatch(login(result))
    }
}

export const starCreateUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
        const result = await registerUserPassEmail({ email, password, displayName })
        console.log(result);
        if (!result.ok) {
            return dispatch(logout(result.errorMessage))
        } return dispatch(login(result))
    }
}

export const starLoginWithEmailPassword =({email,password})=>{
    return async(dispatch) =>{
        dispatch(checkingCredentials())
        const result = await loginWithEmailPassword({email,password})
        console.log(result)
        if(!result.ok){
            return dispatch(logout(result.errorMessage))
        } return dispatch(login(result))
    }
}

export const starlogoutWithFirebase = ()=>{
    return async (dispatch)=>{
        await logoutFirebase()
        dispatch(clearNotesLogout())
        dispatch(logout())
        
    }
}