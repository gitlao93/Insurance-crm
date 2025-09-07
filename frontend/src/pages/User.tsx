"use client";

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
  Tabs,
  Tab,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Search } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { userService, CreateUserRequest, User } from "../services/userService";

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<
    CreateUserRequest & { supervisorId?: number }
  >({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    landlineNumber: "",
    officeHours: "",
    role: "agent",
    agencyId: user?.agency?.id || 0,
    supervisorId: undefined,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState("all"); // Tabs: all, supervisor, agent, inactive

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const agencyId = user?.agency?.id;
      if (!agencyId) throw new Error("No agency info");
      const response = await userService.getUsers(agencyId);
      setUsers(response);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const supervisors = users.filter(
    (u) => u.role === "collection_supervisor" && u.isActive
  );

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { id, isActive, agency, createdAt, ...cleanData } = formData;
      if (editingUser && !cleanData.password) delete cleanData.password;

      if (editingUser) {
        await userService.updateUser(editingUser.id, cleanData);
        setSuccess("User updated successfully");
      } else {
        await userService.createUser(cleanData as CreateUserRequest);
        setSuccess("User created successfully");
      }

      setOpenAdd(false);
      setOpenEdit(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role?: string) => {
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

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({ ...user, password: "", agencyId: user.agency?.id || 0 });
    setOpenEdit(true);
  };

  // Filter users by tab and search term
  const filteredUsers = users
    .filter((u) => {
      if (tab === "all") return u.isActive;
      if (tab === "supervisor")
        return u.role === "collection_supervisor" && u.isActive;
      if (tab === "agent") return u.role === "agent" && u.isActive;
      if (tab === "inactive") return !u.isActive;
      return true;
    })
    .filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label="All" value="all" />
          <Tab label="Supervisor" value="supervisor" />
          <Tab label="Agent" value="agent" />
          <Tab label="Inactive" value="inactive" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
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
          sx={{ mb: 2 }}
        />

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingUsers ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.phoneNumber}</TableCell>
                    <TableCell>
                      <Chip
                        label={u.role?.replace("_", " ").toUpperCase() || "N/A"}
                        color={getRoleColor(u.role)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={u.isActive ? "Active" : "Inactive"}
                        color={u.isActive ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => openEditDialog(u)}>
                        <EditIcon />
                      </IconButton>
                      {u.isActive ? (
                        <Button
                          size="small"
                          onClick={() =>
                            userService.deactivateUser(u.id).then(fetchUsers)
                          }
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          onClick={() =>
                            userService.activateUser(u.id).then(fetchUsers)
                          }
                        >
                          Activate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog (remains unchanged) */}
      <Dialog
        open={openAdd || openEdit}
        onClose={() => {
          setOpenAdd(false);
          setOpenEdit(false);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            {!editingUser && (
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="landlineNumber"
                label="Landline Number"
                fullWidth
                value={formData.landlineNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="officeHours"
                label="Office Hours"
                fullWidth
                value={formData.officeHours}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value="agent">Agent</MenuItem>
                  <MenuItem value="collection_supervisor">
                    Collection Supervisor
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {formData.role === "agent" && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Supervisor</InputLabel>
                  <Select
                    name="supervisorId"
                    value={formData.supervisorId ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        supervisorId: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                  >
                    {supervisors.map((sup) => (
                      <MenuItem key={sup.id} value={sup.id}>
                        {sup.firstName} {sup.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAdd(false);
              setOpenEdit(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading
              ? "Saving..."
              : editingUser
              ? "Update User"
              : "Create User"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
