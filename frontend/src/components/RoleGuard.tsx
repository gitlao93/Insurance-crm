"use client"

import type React from "react"
import { Alert, Box } from "@mui/material"
import { useRoleAccess } from "../hooks/useRoleAccess"

interface RoleGuardProps {
  children: React.ReactNode
  roles: string[]
  fallback?: React.ReactNode
  showError?: boolean
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, roles, fallback = null, showError = true }) => {
  const { hasRole, user } = useRoleAccess()

  if (!hasRole(roles)) {
    if (fallback) {
      return <>{fallback}</>
    }

    if (showError) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Alert severity="warning" sx={{ maxWidth: 400 }}>
            <strong>Insufficient Permissions</strong>
            <br />
            This content is restricted to: {roles.join(", ")}
            <br />
            Your current role: {user?.role}
          </Alert>
        </Box>
      )
    }

    return null
  }

  return <>{children}</>
}
