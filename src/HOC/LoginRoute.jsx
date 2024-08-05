import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const LoginRoute = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [isAuthenticated, setIsAuthenticated] = useState()

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [accessToken])

  if (isAuthenticated === null) {
    return <Spin/>
  }

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/authentication" />
  )
}

export default LoginRoute