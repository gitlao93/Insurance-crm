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
import { leadService, Lead, CreateLeadRequest } from "../services/leadService";
import {
  policyService,
  PolicyPlan,
  PolicyCategory,
} from "../services/policyService";
import { useAuth } from "../contexts/AuthContext";

const LeadManagement = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [plans, setPlans] = useState<PolicyPlan[]>([]);
  const [categories, setCategories] = useState<PolicyCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<CreateLeadRequest>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    agentId: user?.id || 0,
    policyPlanId: 0,
    status: "New",
    note: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState("all"); // Tabs: all, New, In-Progress, Converted, Dropped

  useEffect(() => {
    fetchCategories();
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoadingLeads(true);
      const response = await leadService.getLeads();
      console.log("Fetched leads:", response);
      setLeads(response);
    } catch (err) {
      console.error("Failed to fetch leads", err);
      setLeads([]);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchCategories = async () => {
    const response = await policyService.getCategories();
    setCategories(response);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);

    const selectedCategoryData = categories.find((c) => c.id === categoryId);
    setPlans(selectedCategoryData?.plans || []);

    setFormData({
      ...formData,
      policyPlanId: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (editingLead) {
        await leadService.updateLead(editingLead.id, formData);
        setSuccess("Lead updated successfully");
      } else {
        await leadService.createLead(formData);
        setSuccess("Lead created successfully");
      }

      setOpenAdd(false);
      setOpenEdit(false);
      setEditingLead(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        agentId: user?.id || 0,
        policyPlanId: 0,
        status: "New",
        note: "",
      });
      fetchLeads();
    } catch (err: any) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (lead: Lead) => {
    setEditingLead(lead);
    console.log("Editing lead:", lead);

    // get the category id from the lead’s policyPlan
    const categoryId = lead.policyPlan?.categoryId || 0;

    // set the selected category
    setSelectedCategory(categoryId);

    // load the plans for this category
    if (categoryId) {
      const selectedCategoryData = categories.find((c) => c.id === categoryId);
      setPlans(selectedCategoryData?.plans || []);
    } else {
      setPlans([]);
    }

    // populate form data
    setFormData({
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phoneNumber: lead.phoneNumber,
      agentId: lead.agentId,
      policyPlanId: lead.policyPlanId,
      status: lead.status,
      note: lead.note,
    });

    setOpenEdit(true);
  };

  // Filter leads by tab and search term
  const filteredLeads = leads
    .filter((l) => {
      if (tab === "all") return true;
      return l.status === tab;
    })
    .filter((l) =>
      `${l.firstName} ${l.lastName} ${l.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "info";
      case "In-Progress":
        return "warning";
      case "Converted":
        return "success";
      case "Dropped":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Lead Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingLead(null); // reset editing mode
            setSelectedCategory(""); // clear category
            setPlans([]); // clear plans
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              agentId: user?.id || 0,
              policyPlanId: 0,
              status: "New",
              note: "",
            });
            setOpenAdd(true);
          }}
        >
          Add Lead
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label="All" value="all" />
          <Tab label="New" value="New" />
          <Tab label="In-Progress" value="In-Progress" />
          <Tab label="Converted" value="Converted" />
          <Tab label="Dropped" value="Dropped" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          placeholder="Search leads..."
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
                <TableCell>Category</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadingLeads ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>
                      {l.firstName} {l.lastName}
                    </TableCell>
                    <TableCell>{l.email}</TableCell>
                    <TableCell>{l.phoneNumber}</TableCell>
                    <TableCell>
                      {l.policyPlan?.category?.categoryName || "N/A"}
                    </TableCell>
                    <TableCell>{l.policyPlan?.planName || "N/A"}</TableCell>
                    <TableCell>
                      <Chip
                        label={l.status}
                        color={getStatusColor(l.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{l.note || ""}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => openEditDialog(l)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openAdd || openEdit}
        onClose={() => {
          setOpenAdd(false);
          setOpenEdit(false);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{editingLead ? "Edit Lead" : "Add Lead"}</DialogTitle>
        <DialogContent>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>

            {/* Email */}
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

            {/* Phone Number */}
            <Grid item xs={12}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Grid>

            {/* Category Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(Number(e.target.value))}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Plan Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Policy Plan</InputLabel>
                <Select
                  name="policyPlanId"
                  value={formData.policyPlanId ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      policyPlanId: e.target.value ? Number(e.target.value) : 0,
                    })
                  }
                  disabled={!selectedCategory}
                >
                  {plans.map((plan) => (
                    <MenuItem key={plan.id} value={plan.id}>
                      {plan.planName} ({plan.currency} {plan.monthlyRate})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="In-Progress">In-Progress</MenuItem>
                  <MenuItem value="Converted">Converted</MenuItem>
                  <MenuItem value="Dropped">Dropped</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Note */}
            <Grid item xs={12}>
              <TextField
                name="note"
                label="Note"
                fullWidth
                multiline
                minRows={3}
                value={formData.note || ""}
                onChange={handleChange}
              />
            </Grid>
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
              : editingLead
              ? "Update Lead"
              : "Create Lead"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeadManagement;
