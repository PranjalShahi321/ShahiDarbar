import { Navigate } from "react-router-dom"

function AdminRoute({
  children,
}) {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  if (!userInfo) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  if (!userInfo.isAdmin) {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  return children
}

export default AdminRoute