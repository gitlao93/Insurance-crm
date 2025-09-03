"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

interface AgencyData {
  id: number;
  agencyName: string;
  cityMunicipality: string;
  street: string;
  postalCode: string;
}

const Settings = () => {
  const { user } = useAuth();
  const [agencyData, setAgencyData] = useState<AgencyData>({
    id: 0,
    agencyName: "",
    cityMunicipality: "",
    street: "",
    postalCode: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetchAgencyData();
  }, []);
  const fetchAgencyData = async () => {
    try {
      setLoadingData(true);
      const AgencyData: AgencyData = {
        id: user?.agency?.id || 0,
        agencyName: user?.agency?.agencyName || "",
        street: user?.agency?.street || "",
        cityMunicipality: user?.agency?.cityMunicipality || "",
        postalCode: user?.agency?.postalCode || "",
      };
      setAgencyData(AgencyData);
    } catch (err) {
      setError("Failed to load agency data");
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgencyData({
      ...agencyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      // Mock API call - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err: any) {
      setError("Failed to update agency information");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Agency Settings
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage your agency information and settings
      </Typography>

      <Paper sx={{ p: 3, mt: 3, maxWidth: 800 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Agency information updated successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="agencyName"
                label="Agency Name"
                value={agencyData.agencyName}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="agencyStreey"
                label="Streey"
                value={agencyData.street}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="agencyCityMunicipality"
                label="City/Municipality"
                value={agencyData.cityMunicipality}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="agencyPostalCode"
                label="Postal Code"
                value={agencyData.postalCode}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={
                loading ? <CircularProgress size={20} /> : <SaveIcon />
              }
              disabled={loading}
              size="large"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
