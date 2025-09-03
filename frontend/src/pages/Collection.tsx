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
  Alert,
} from "@mui/material"
import { Search, Visibility, Payment, Phone, Email } from "@mui/icons-material"
import { useAuth } from "../contexts/AuthContext"
import { useRoleAccess } from "../hooks/useRoleAccess"

interface Collection {
  id: number
  policyNumber: string
  clientName: string
  amountDue: number
  dueDate: string
  daysOverdue: number
  status: "pending" | "overdue" | "in_progress" | "resolved"
  lastContact: string
  assignedAgent: string
  notes: string
}

const Collection = () => {
  const { user } = useAuth()
  const { isAdmin, isCollectionSupervisor } = useRoleAccess()
  const [collections, setCollections] = useState<Collection[]>([])
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockCollections: Collection[] = [
      {
        id: 1,
        policyNumber: "POL-2024-001",
        clientName: "John Doe",
        amountDue: 1200,
        dueDate: "2024-01-15",
        daysOverdue: 10,
        status: "overdue",
        lastContact: "2024-01-20",
        assignedAgent: "Agent Smith",
        notes: "Client requested payment extension",
      },
      {
        id: 2,
        policyNumber: "POL-2024-002",
        clientName: "Jane Smith",
        amountDue: 800,
        dueDate: "2024-01-20",
        daysOverdue: 5,
        status: "in_progress",
        lastContact: "2024-01-22",
        assignedAgent: "Agent Johnson",
        notes: "Payment plan established",
      },
      {
        id: 3,
        policyNumber: "POL-2024-003",
        clientName: "Bob Wilson",
        amountDue: 1500,
        dueDate: "2024-01-25",
        daysOverdue: 0,
        status: "pending",
        lastContact: "2024-01-18",
        assignedAgent: "Agent Brown",
        notes: "First notice sent",
      },
    ]

    setCollections(mockCollections)
    setFilteredCollections(mockCollections)
  }, [])

  useEffect(() => {
    let filtered = collections

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (collection) =>
          collection.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.clientName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter((collection) => collection.status === "overdue")
    } else if (tabValue === 2) {
      filtered = filtered.filter((collection) => collection.status === "in_progress")
    } else if (tabValue === 3) {
      filtered = filtered.filter((collection) => collection.status === "resolved")
    }

    setFilteredCollections(filtered)
  }, [searchTerm, collections, tabValue])

  const handleViewCollection = (collection: Collection) => {
    setSelectedCollection(collection)
    setOpenDialog(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "info"
      case "overdue":
        return "error"
      case "in_progress":
        return "warning"
      case "resolved":
        return "success"
      default:
        return "default"
    }
  }

  const getPriorityLevel = (daysOverdue: number) => {
    if (daysOverdue > 30) return { level: "High", color: "error" }
    if (daysOverdue > 15) return { level: "Medium", color: "warning" }
    if (daysOverdue > 0) return { level: "Low", color: "info" }
    return { level: "Normal", color: "success" }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Collection Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {isCollectionSupervisor()
              ? "Manage collections for all users in your agency"
              : "Manage all collections in your agency"}
          </Typography>
        </Box>
      </Box>

      {!isAdmin() && !isCollectionSupervisor() && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You don't have permission to access collection management.
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search collections..."
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
          <Tab label="All Collections" />
          <Tab label="Overdue" />
          <Tab label="In Progress" />
          <Tab label="Resolved" />
        </Tabs>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Policy Number</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Amount Due</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Days Overdue</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned Agent</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCollections.map((collection) => {
                const priority = getPriorityLevel(collection.daysOverdue)
                return (
                  <TableRow key={collection.id}>
                    <TableCell>{collection.policyNumber}</TableCell>
                    <TableCell>{collection.clientName}</TableCell>
                    <TableCell>${collection.amountDue}</TableCell>
                    <TableCell>{collection.dueDate}</TableCell>
                    <TableCell>{collection.daysOverdue}</TableCell>
                    <TableCell>
                      <Chip label={priority.level} color={priority.color} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={collection.status.replace("_", " ")}
                        color={getStatusColor(collection.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{collection.assignedAgent}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleViewCollection(collection)}>
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Phone />
                      </IconButton>
                      <IconButton size="small">
                        <Email />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Collection Details</DialogTitle>
        <DialogContent>
          {selectedCollection && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Policy Number"
                  value={selectedCollection.policyNumber}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Client Name"
                  value={selectedCollection.clientName}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Amount Due"
                  value={`$${selectedCollection.amountDue}`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Days Overdue"
                  value={selectedCollection.daysOverdue}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  value={selectedCollection.notes}
                  multiline
                  rows={3}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="outlined" startIcon={<Phone />}>
            Call Client
          </Button>
          <Button variant="contained" startIcon={<Payment />}>
            Record Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Collection
