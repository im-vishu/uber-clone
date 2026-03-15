import React, { useState, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'


const UserProtectWrapper = ({
      children}) => {
              const token = localStorage.getItem('token')
              const navigate = useNavigate()

              useEffect(() => {
                if (!token) {
                  navigate('/login')
                }
              }, [token])

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper
