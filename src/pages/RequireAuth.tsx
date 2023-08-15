import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../store/reducers/AuthSlice"

const RequireAuth = () => {
  const location = useLocation()
  const user = useSelector(selectCurrentUser);
  
  return (
    user && user.tokens.accessToken ? <Outlet />
      : <Navigate to="auth/sign_in" state={{ from: location }} replace />
  )
}
export default RequireAuth