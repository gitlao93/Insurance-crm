"use client"

import type React from "react"
import { Alert, Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useRoleAccess } from "../hooks/useRoleAccess"

interface RouteGuardProps {
  children: React.ReactNode
  requiredRoles: string[]
  fallbackPath?: string
  showError?: boolean
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredRoles,
  fallbackPath = "/dashboard/overview",
  showError = true,
}) => {
  const { hasRole, user } = useRoleAccess()
  const navigate = useNavigate()

  if (!hasRole(requiredRoles)) {
    if (showError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" p={3}>
          <Alert
            severity="error"
            sx={{ maxWidth: 500 }}
            action={
              <Button color="inherit" size="small" onClick={() => navigate(fallbackPath)}>
                Go Back
              </Button>
            }
          >
            <strong>Access Denied</strong>
            <br />
            This page requires one of the following roles: {requiredRoles.join(", ")}
            <br />
            Your current role: <strong>{user?.role}</strong>
          </Alert>
        </Box>
      )
    }

    // Silent redirect
    navigate(fallbackPath, { replace: true })
    return null
  }

  return <>{children}</>
}
