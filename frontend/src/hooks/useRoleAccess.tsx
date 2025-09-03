"use client"

import { useAuth } from "../contexts/AuthContext"

export const useRoleAccess = () => {
  const { user } = useAuth()

  const hasRole = (roles: string[]): boolean => {
    return user ? roles.includes(user.role) : false
  }

  const canAccessClients = (): boolean => {
    return hasRole(["admin", "agent"])
  }

  const canAccessAllClients = (): boolean => {
    return hasRole(["admin"])
  }

  const canAccessPolicyHolders = (): boolean => {
    return hasRole(["admin", "agent", "collection_supervisor"])
  }

  const canAccessAllPolicyHolders = (): boolean => {
    return hasRole(["admin", "collection_supervisor"])
  }

  const canAddUsers = (): boolean => {
    return hasRole(["admin"])
  }

  const canAccessCollections = (): boolean => {
    return hasRole(["admin", "collection_supervisor"])
  }

  const canManageAgency = (): boolean => {
    return hasRole(["admin"])
  }

  const isAdmin = (): boolean => {
    return user?.role === "admin"
  }

  const isAgent = (): boolean => {
    return user?.role === "agent"
  }

  const isCollectionSupervisor = (): boolean => {
    return user?.role === "collection_supervisor"
  }

  return {
    user,
    hasRole,
    canAccessClients,
    canAccessAllClients,
    canAccessPolicyHolders,
    canAccessAllPolicyHolders,
    canAddUsers,
    canAccessCollections,
    canManageAgency,
    isAdmin,
    isAgent,
    isCollectionSupervisor,
  }
}
