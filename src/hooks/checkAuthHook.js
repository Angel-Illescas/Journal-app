import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth/authSlice'
import { starLoadingNotes } from '../store/journal'



export const checkingAuthHook = ()=>{
const { status } = useSelector(state => state.authGeneralState)
  const dispatch = useDispatch()

  useEffect(() => {
        
    onAuthStateChanged( FirebaseAuth, async( user ) => {
    if ( !user ) return dispatch( logout() );

    const { uid, email, displayName, photoURL } = user;
    dispatch( login({ uid, email, displayName, photoURL }) )
    dispatch( starLoadingNotes() )
    ;
    })
}, []);

  return {status}

}






