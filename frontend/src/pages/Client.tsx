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
  Alert,
} from "@mui/material"
import { Add, Search, Edit, Visibility } from "@mui/icons-material"
import { useAuth } from "../contexts/AuthContext"
import { useRoleAccess } from "../hooks/useRoleAccess"
import { usePermissions } from "../hooks/usePermissions"
import { PermissionGate } from "../components/PermissionGate"
import { dashboardService } from "../services/dashboardService"

const ClientPage = () => {
  const { user } = useAuth()
  const { canAccessAllClients } = useRoleAccess()
  const { checkPermission } = usePermissions()
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const data = await dashboardService.getClients()
        setClients(data)
        setFilteredClients(data)
      } catch (err: any) {
        console.error("Failed to fetch clients:", err)
        setError("Failed to load client data")
        const mockClients = [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@email.com",
            phone: "(555) 123-4567",
            status: "active",
            assignedAgent: canAccessAllClients() ? "Agent Smith" : `${user?.firstName} ${user?.lastName}`,
            totalPolicies: 3,
            lastContact: "2024-01-15",
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@email.com",
            phone: "(555) 987-6543",
            status: "pending",
            assignedAgent: canAccessAllClients() ? "Agent Johnson" : `${user?.firstName} ${user?.lastName}`,
            totalPolicies: 1,
            lastContact: "2024-01-10",
          },
          {
            id: 3,
            firstName: "Bob",
            lastName: "Wilson",
            email: "bob.wilson@email.com",
            phone: "(555) 456-7890",
            status: "active",
            assignedAgent: canAccessAllClients() ? "Agent Brown" : `${user?.firstName} ${user?.lastName}`,
            totalPolicies: 2,
            lastContact: "2024-01-12",
          },
        ]

        const userClients = canAccessAllClients()
          ? mockClients
          : mockClients.filter((client) => client.assignedAgent === `${user?.firstName} ${user?.lastName}`)

        setClients(userClients)
        setFilteredClients(userClients)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [user, canAccessAllClients])

  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredClients(filtered)
  }, [searchTerm, clients])

  const handleViewClient = (client) => {
    setSelectedClient(client)
    setOpenDialog(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success"
      case "pending":
        return "warning"
      case "inactive":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Client Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {canAccessAllClients() ? "Manage all clients in your agency" : "Manage your assigned clients"}
          </Typography>
        </Box>
        <PermissionGate permission="canCreateClients">
          <Button variant="contained" startIcon={<Add />}>
            Add Client
          </Button>
        </PermissionGate>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error} - Showing demo data
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search clients..."
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

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                {canAccessAllClients() && <TableCell>Assigned Agent</TableCell>}
                <TableCell>Policies</TableCell>
                <TableCell>Last Contact</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    {client.firstName} {client.lastName}
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <Chip label={client.status} color={getStatusColor(client.status)} size="small" variant="outlined" />
                  </TableCell>
                  {canAccessAllClients() && <TableCell>{client.assignedAgent}</TableCell>}
                  <TableCell>{client.totalPolicies}</TableCell>
                  <TableCell>{client.lastContact}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleViewClient(client)}>
                      <Visibility />
                    </IconButton>
                    <IconButton size="small">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Client Details</DialogTitle>
        <DialogContent>
          {selectedClient && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={selectedClient.firstName}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={selectedClient.lastName}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" value={selectedClient.email} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" value={selectedClient.phone} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Status" value={selectedClient.status} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Policies"
                  value={selectedClient.totalPolicies}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained">Edit Client</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ClientPage
