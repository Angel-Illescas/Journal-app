import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const resp = await signInWithPopup(FirebaseAuth, googleProvider)
        /* const credentials = GoogleAuthProvider.credentialFromResult(result)
        console.log({ credentials }); */
        const { displayName, email, photoURL, uid } = resp.user

        return {
            ok: true,
            displayName, email, photoURL, uid,
        }


    } catch (error) {
        console.log(error);
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        const errorCode = error.code
        return {
            ok: false,
            errorMessage, credential, errorCode
        }

    }
}


/* Registro con password y email */

export const registerUserPassEmail = async ({ email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        console.log(resp);
        const { uid, photoURL } = resp.user
        await updateProfile(FirebaseAuth.currentUser, { displayName }) //Actualiza el displayName en Firebase
        return {
            ok: true,
            uid, photoURL, email, displayName
        }


    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
        }
    }

}

export const loginWithEmailPassword = async ({email , password }) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { displayName, photoURL, uid } = resp.user
        return {
            ok: true,
            displayName, email, photoURL, uid,
        }

    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
        }

    }

}

//LOGOUT DE FIREBASE

export const logoutFirebase = async ()=>{
    return await FirebaseAuth.signOut()
}