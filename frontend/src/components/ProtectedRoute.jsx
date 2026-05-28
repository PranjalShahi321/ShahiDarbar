import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  /* NOT LOGGED IN */

  if (!userInfo) {

    return <Navigate to="/login" replace />

  }

  /* NOT ADMIN */

  if (!userInfo.isAdmin) {

    return <Navigate to="/" replace />

  }

  /* ADMIN */

  return children
}

export default ProtectedRoute