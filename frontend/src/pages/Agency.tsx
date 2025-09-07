import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { agencyService, Agency } from "../services/agencyService";
import { userService, User } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [agencyData, setAgencyData] = useState<Agency | null>(null);
  const [originalAgencyData, setOriginalAgencyData] = useState<Agency | null>(
    null
  );
  const [userData, setUserData] = useState<User | null>(null);
  const [originalUserData, setOriginalUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [savingAgency, setSavingAgency] = useState(false);
  const [savingUser, setSavingUser] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAgencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!agencyData) return;
    setAgencyData({
      ...agencyData,
      [e.target.name]: e.target.value,
    });
  };
  const fetchData = async () => {
    try {
      const userId = user?.id ?? 0; // example: replace with auth context/localStorage
      const u = await userService.getUserById(userId);
      setUserData(u);
      setOriginalUserData(u);

      if (u.agency?.id) {
        const agency = await agencyService.getAgencyById(u.agency.id);
        setAgencyData(agency);
        setOriginalAgencyData(agency);
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgencyUpdate = async () => {
    if (!agencyData || !originalAgencyData) return;
    setSavingAgency(true);
    try {
      const changed = getChangedFields(originalAgencyData, agencyData);
      if (Object.keys(changed).length === 0) return; // nothing to update

      const updated = await agencyService.updateAgency(agencyData.id, changed);
      setAgencyData(updated);
      setOriginalAgencyData(updated);
    } catch (err) {
      console.error("Failed to update agency:", err);
    } finally {
      setSavingAgency(false);
    }
  };

  const handleUserUpdate = async () => {
    if (!userData || !originalUserData) return;
    setSavingUser(true);
    try {
      const changed = getChangedFields(originalUserData, userData);
      if (Object.keys(changed).length === 0) return; // nothing to update

      const updated = await userService.updateUser(userData.id, changed);
      setUserData(updated);
      setOriginalUserData(updated);
    } catch (err) {
      console.error("Failed to update user:", err);
    } finally {
      setSavingUser(false);
    }
  };

  function getChangedFields<T extends Record<string, any>>(
    original: T,
    updated: T
  ): Partial<T> {
    const changed: Partial<T> = {};
    Object.keys(updated).forEach((key) => {
      if (!isEqual(updated[key], original[key])) {
        (changed as any)[key] = updated[key];
      }
    });
    return changed;
  }

  // simple equality check for primitives/strings/numbers
  function isEqual(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Agency
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Manage your agency information
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Agency Form */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            {agencyData && (
              <div>
                <h2 className="text-xl font-bold mb-4">Agency Settings</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="agencyName"
                      label="Agency Name"
                      value={agencyData.agencyName ?? ""}
                      onChange={handleAgencyChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="street"
                      label="Street"
                      value={agencyData.street ?? ""}
                      onChange={handleAgencyChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="cityMunicipality"
                      label="City / Municipality"
                      value={agencyData.cityMunicipality ?? ""}
                      onChange={handleAgencyChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="postalCode"
                      label="Postal Code"
                      value={agencyData.postalCode ?? ""}
                      onChange={handleAgencyChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={
                        savingAgency || isEqual(agencyData, originalAgencyData)
                      }
                      onClick={handleAgencyUpdate}
                    >
                      {savingAgency ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            {/* User Form */}
            {userData && (
              <div>
                <h2 className="text-xl font-bold mb-4">User Settings</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={userData.firstName ?? ""}
                      onChange={handleUserChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={userData.lastName ?? ""}
                      onChange={handleUserChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      value={userData.email ?? ""}
                      onChange={handleUserChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      value={userData.phoneNumber ?? ""}
                      onChange={handleUserChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={
                        savingUser || isEqual(userData, originalUserData)
                      }
                      onClick={handleUserUpdate}
                    >
                      {savingUser ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
