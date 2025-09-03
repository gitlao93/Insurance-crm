"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
} from "@mui/material";
import { People, Policy, Collections, AttachMoney } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useRoleAccess } from "../hooks/useRoleAccess";
import {
  dashboardService,
  type DashboardStats,
} from "../services/dashboardService";

const Overview = () => {
  const { user } = useAuth();
  const { isAdmin, isAgent, isCollectionSupervisor } = useRoleAccess();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data");
        // Fallback to mock data for demo purposes
        setStats({
          totalClients: isAgent() ? 24 : isAdmin() ? 156 : 89,
          activePolicies: isAgent() ? 45 : isAdmin() ? 342 : 178,
          pendingCollections: isCollectionSupervisor() ? 23 : isAdmin() ? 8 : 0,
          monthlyRevenue: isAgent() ? 8450 : isAdmin() ? 45600 : 23400,
          recentActivities: [
            {
              id: 1,
              type: "Client",
              description: "New client registration completed",
              timestamp: "2 hours ago",
              status: "success",
            },
            {
              id: 2,
              type: "Policy",
              description: "Policy renewal pending approval",
              timestamp: "4 hours ago",
              status: "warning",
            },
            {
              id: 3,
              type: "Collection",
              description: "Payment overdue - follow up required",
              timestamp: "1 day ago",
              status: "error",
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.role]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "default";
    }
  };

  const StatCard = ({ title, value, icon, color = "primary" }: any) => (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {typeof value === "number" && title.includes("Revenue")
                ? `$${value.toLocaleString()}`
                : value}
            </Typography>
          </Box>
          <Box sx={{ color: `${color}.main` }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Overview
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Overview
        </Typography>
        <Alert severity="error">Failed to load dashboard data</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Welcome back, {user?.firstName}! Here's your{" "}
        {user?.role?.replace("_", " ")} dashboard overview.
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error} - Showing demo data
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Clients"
            value={stats.totalClients}
            icon={<People fontSize="large" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Policies"
            value={stats.activePolicies}
            icon={<Policy fontSize="large" />}
            color="success"
          />
        </Grid>
        {(isAdmin() || isCollectionSupervisor()) && (
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Collections"
              value={stats.pendingCollections}
              icon={<Collections fontSize="large" />}
              color="warning"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Revenue"
            value={stats.monthlyRevenue}
            icon={<AttachMoney fontSize="large" />}
            color="success"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.recentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.type}</TableCell>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>{activity.timestamp}</TableCell>
                      <TableCell>
                        <Chip
                          label={activity.status}
                          color={getStatusColor(activity.status)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {isAdmin() && (
                <Card variant="outlined" sx={{ p: 2, cursor: "pointer" }}>
                  <Typography variant="body2">Add New User</Typography>
                </Card>
              )}
              <Card variant="outlined" sx={{ p: 2, cursor: "pointer" }}>
                <Typography variant="body2">View Reports</Typography>
              </Card>
              <Card variant="outlined" sx={{ p: 2, cursor: "pointer" }}>
                <Typography variant="body2">Export Data</Typography>
              </Card>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
