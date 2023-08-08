import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { isEmpty } from "lodash"
//import { selectCurrentToken } from "./authSlice"

const RequireAuth = () => {
  const location = useLocation()
  const user = useSelector(((state:any) => state.authReducer.user))
  return (
    user ? <Outlet />
      : <Navigate to="auth/sign_in" state={{ from: location }} replace />
  )
}
export default RequireAuth