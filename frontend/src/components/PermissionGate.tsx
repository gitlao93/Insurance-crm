"use client"

import type React from "react"
import { Alert, Box } from "@mui/material"
import { usePermissions } from "../hooks/usePermissions"

interface PermissionGateProps {
  children: React.ReactNode
  permission: string
  fallback?: React.ReactNode
  showError?: boolean
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  permission,
  fallback = null,
  showError = false,
}) => {
  const { checkPermission, user } = usePermissions()

  const hasPermission = checkPermission(permission as any)

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>
    }

    if (showError) {
      return (
        <Box p={2}>
          <Alert severity="warning">
            <strong>Permission Required</strong>
            <br />
            You need additional permissions to access this feature.
            <br />
            Current role: {user?.role}
          </Alert>
        </Box>
      )
    }

    return null
  }

  return <>{children}</>
}
