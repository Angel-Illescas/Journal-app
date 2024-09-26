import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/component/CheckingAuth'
import { checkingAuthHook } from '../hooks'


export const AppRouter = () => {


  const {status} = checkingAuthHook()
  

  if (status == "checking") {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
        (status == "autheticated")
          ? <Route path='/*' element={<JournalRoutes />} />
          : <Route path='/auth/*' element={<AuthRoutes />} />
      }
      <Route path='/*' element={<Navigate to="/auth/login" />} />

      <Route />
    </Routes>
  )
}
