"use client"

import type React from "react"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { CircularProgress, Box, Alert } from "@mui/material"

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: string[]
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" p={3}>
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          <strong>Access Denied</strong>
          <br />
          You don't have permission to access this page. Your role ({user.role}) is not authorized for this resource.
        </Alert>
      </Box>
    )
  }

  return <>{children}</>
}
