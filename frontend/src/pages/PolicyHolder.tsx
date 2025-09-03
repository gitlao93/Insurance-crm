"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip,
  IconButton,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material"
import { Add, Search, Edit, Visibility, Policy } from "@mui/icons-material"
import { useAuth } from "../contexts/AuthContext"
import { useRoleAccess } from "../hooks/useRoleAccess"

interface PolicyHolder {
  id: number
  policyNumber: string
  holderName: string
  policyType: string
  premium: number
  status: "active" | "expired" | "pending" | "cancelled"
  startDate: string
  endDate: string
  clientId: number
  clientName: string
  assignedAgent: string
}

const PolicyHolder = () => {
  const { user } = useAuth()
  const { isAdmin, isAgent, isCollectionSupervisor, canAccessAllPolicyHolders } = useRoleAccess()
  const [policyHolders, setPolicyHolders] = useState<PolicyHolder[]>([])
  const [filteredPolicyHolders, setFilteredPolicyHolders] = useState<PolicyHolder[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyHolder | null>(null)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockPolicyHolders: PolicyHolder[] = [
      {
        id: 1,
        policyNumber: "POL-2024-001",
        holderName: "John Doe",
        policyType: "Life Insurance",
        premium: 1200,
        status: "active",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        clientId: 1,
        clientName: "John Doe",
        assignedAgent: canAccessAllPolicyHolders() ? "Agent Smith" : `${user?.firstName} ${user?.lastName}`,
      },
      {
        id: 2,
        policyNumber: "POL-2024-002",
        holderName: "Jane Smith",
        policyType: "Auto Insurance",
        premium: 800,
        status: "pending",
        startDate: "2024-02-01",
        endDate: "2025-01-31",
        clientId: 2,
        clientName: "Jane Smith",
        assignedAgent: canAccessAllPolicyHolders() ? "Agent Johnson" : `${user?.firstName} ${user?.lastName}`,
      },
      {
        id: 3,
        policyNumber: "POL-2024-003",
        holderName: "Bob Wilson",
        policyType: "Home Insurance",
        premium: 1500,
        status: "expired",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        clientId: 3,
        clientName: "Bob Wilson",
        assignedAgent: canAccessAllPolicyHolders() ? "Agent Brown" : `${user?.firstName} ${user?.lastName}`,
      },
    ]

    // Filter policies based on role
    let userPolicies = mockPolicyHolders
    if (isAgent()) {
      userPolicies = mockPolicyHolders.filter(
        (policy) => policy.assignedAgent === `${user?.firstName} ${user?.lastName}`,
      )
    }

    setPolicyHolders(userPolicies)
    setFilteredPolicyHolders(userPolicies)
  }, [user, isAgent, canAccessAllPolicyHolders])

  useEffect(() => {
    let filtered = policyHolders

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (policy) =>
          policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          policy.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          policy.policyType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter((policy) => policy.status === "active")
    } else if (tabValue === 2) {
      filtered = filtered.filter((policy) => policy.status === "pending")
    } else if (tabValue === 3) {
      filtered = filtered.filter((policy) => policy.status === "expired")
    }

    setFilteredPolicyHolders(filtered)
  }, [searchTerm, policyHolders, tabValue])

  const handleViewPolicy = (policy: PolicyHolder) => {
    setSelectedPolicy(policy)
    setOpenDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "pending":
        return "warning"
      case "expired":
        return "error"
      case "cancelled":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Policy Holder Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {isAgent() ? "Manage policy holders for your clients" : "Manage all policy holders in your agency"}
          </Typography>
        </Box>
        {(isAdmin() || isAgent()) && (
          <Button variant="contained" startIcon={<Add />}>
            Add Policy
          </Button>
        )}
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="All Policies" />
          <Tab label="Active" />
          <Tab label="Pending" />
          <Tab label="Expired" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Policy Number</TableCell>
                <TableCell>Holder Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                {canAccessAllPolicyHolders() && <TableCell>Agent</TableCell>}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPolicyHolders.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.policyNumber}</TableCell>
                  <TableCell>{policy.holderName}</TableCell>
                  <TableCell>{policy.policyType}</TableCell>
                  <TableCell>${policy.premium}</TableCell>
                  <TableCell>
                    <Chip label={policy.status} color={getStatusColor(policy.status)} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{policy.startDate}</TableCell>
                  <TableCell>{policy.endDate}</TableCell>
                  {canAccessAllPolicyHolders() && <TableCell>{policy.assignedAgent}</TableCell>}
                  <TableCell>
                    <IconButton size="small" onClick={() => handleViewPolicy(policy)}>
                      <Visibility />
                    </IconButton>
                    {(isAdmin() || isAgent()) && (
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Policy />
            Policy Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedPolicy && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Policy Number"
                  value={selectedPolicy.policyNumber}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Holder Name"
                  value={selectedPolicy.holderName}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Policy Type"
                  value={selectedPolicy.policyType}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Premium"
                  value={`$${selectedPolicy.premium}`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  value={selectedPolicy.startDate}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="End Date" value={selectedPolicy.endDate} InputProps={{ readOnly: true }} />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {(isAdmin() || isAgent()) && <Button variant="contained">Edit Policy</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PolicyHolder
