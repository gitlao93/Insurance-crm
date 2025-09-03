"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { userService, CreateUserRequest } from "../services/userService";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  landlineNumber?: string;
  officeHours?: string;
  role: string;
  createdAt: string;
}

const AddUser = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    landlineNumber: "",
    officeHours: "",
    role: "agent" as "admin" | "agent" | "collection_supervisor",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);

      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (!parsedUser || !parsedUser.agency?.id) {
        throw new Error("No agency information found for the current user.");
      }

      const agencyId = parsedUser.agency.id;

      const response = await userService.getUsers(agencyId);

      setUsers(response);
      setFilteredUsers(response); // initialize with full list
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const userData: CreateUserRequest = {
        ...formData,
        agencyId: user?.agency.id || 0,
      };

      await userService.createUser(userData);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        landlineNumber: "",
        officeHours: "",
        role: "agent",
      });
      setOpen(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "error";
      case "collection_supervisor":
        return "warning";
      case "agent":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage users in your agency
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ height: "fit-content" }}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search users..."
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
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Office Hours</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingUsers ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((userRow) => (
                  <TableRow key={userRow.id} hover>
                    <TableCell>
                      {userRow.firstName} {userRow.lastName}
                    </TableCell>
                    <TableCell>{userRow.email}</TableCell>
                    <TableCell>{userRow.phoneNumber}</TableCell>
                    <TableCell>
                      <Chip
                        label={userRow.role.replace("_", " ").toUpperCase()}
                        size="small"
                        color={getRoleColor(userRow.role)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {userRow.officeHours || "Not specified"}
                    </TableCell>
                    <TableCell>
                      {new Date(userRow.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              User created successfully!
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="landlineNumber"
                  label="Landline Number"
                  value={formData.landlineNumber}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="officeHours"
                  label="Office Hours"
                  value={formData.officeHours}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    label="Role"
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <MenuItem value="agent">Agent</MenuItem>
                    <MenuItem value="collection_supervisor">
                      Collection Supervisor
                    </MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Creating..." : "Create User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddUser;
