import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

const LoginRoute = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [isAuthenticated, setIsAuthenticated] = useState()
  const tipoUsuario = useSelector((state) => state.user.tipo_usuario)
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

  if (isAuthenticated) {
    if (tipoUsuario === 'alumno') {
      return <Navigate to="/student" />
    } else {
      return <Navigate to="/" />
    }
  } else {
    return <Navigate to="/authentication" />
  }
}


export default LoginRoute