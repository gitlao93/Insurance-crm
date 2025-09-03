"use client"

import { useAuth } from "../contexts/AuthContext"

export const usePermissions = () => {
  const { user } = useAuth()

  const permissions = {
    // User Management
    canCreateUsers: user?.role === "admin",
    canViewAllUsers: ["admin", "collection_supervisor"].includes(user?.role || ""),
    canEditUsers: user?.role === "admin",
    canDeleteUsers: user?.role === "admin",

    // Client Management
    canViewClients: ["admin", "agent"].includes(user?.role || ""),
    canViewAllClients: user?.role === "admin",
    canCreateClients: ["admin", "agent"].includes(user?.role || ""),
    canEditClients: ["admin", "agent"].includes(user?.role || ""),
    canDeleteClients: user?.role === "admin",

    // Policy Management
    canViewPolicies: ["admin", "agent", "collection_supervisor"].includes(user?.role || ""),
    canViewAllPolicies: ["admin", "collection_supervisor"].includes(user?.role || ""),
    canCreatePolicies: ["admin", "agent"].includes(user?.role || ""),
    canEditPolicies: ["admin", "agent"].includes(user?.role || ""),
    canDeletePolicies: user?.role === "admin",

    // Collection Management
    canViewCollections: ["admin", "collection_supervisor"].includes(user?.role || ""),
    canManageCollections: ["admin", "collection_supervisor"].includes(user?.role || ""),
    canProcessPayments: ["admin", "collection_supervisor"].includes(user?.role || ""),

    // Agency Management
    canManageAgency: user?.role === "admin",
    canViewAgencyStats: ["admin", "collection_supervisor"].includes(user?.role || ""),

    // Data Access Levels
    hasFullAccess: user?.role === "admin",
    hasLimitedAccess: user?.role === "agent",
    hasCollectionAccess: ["admin", "collection_supervisor"].includes(user?.role || ""),
  }

  const checkPermission = (permission: keyof typeof permissions): boolean => {
    return permissions[permission] || false
  }

  const requirePermission = (permission: keyof typeof permissions): void => {
    if (!checkPermission(permission)) {
      throw new Error(`Permission denied: ${permission}`)
    }
  }

  return {
    permissions,
    checkPermission,
    requirePermission,
    user,
  }
}
