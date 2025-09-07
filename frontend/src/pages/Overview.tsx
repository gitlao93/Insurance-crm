"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Alert,
  LinearProgress,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { People, SupervisorAccount, Person } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useRoleAccess } from "../hooks/useRoleAccess";
import {
  dashboardService,
  SupervisorBox,
  UserStats,
} from "../services/dashboardService";

const Overview = () => {
  const { user } = useAuth();
  const { isAdmin, isCollectionSupervisor } = useRoleAccess();

  const [stats, setStats] = useState<UserStats | null>(null);
  const [supervisors, setSupervisors] = useState<SupervisorBox[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user stats (only for admins)
  useEffect(() => {
    if (!isAdmin()) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getUserStats(user?.agency?.id);
        setStats(data);
      } catch (err: any) {
        console.error("Failed to fetch user stats:", err);
        setError("Failed to load user stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  // Fetch supervisors (admins see all, supervisors see only themselves)
  useEffect(() => {
    if (!isAdmin() && !isCollectionSupervisor()) return;

    const fetchSupervisors = async () => {
      try {
        const data = await dashboardService.getSupervisorsWithAgents(
          user?.agency?.id
        );
        // Map firstName + lastName to name, and count agents
        const mapped = data.map((s) => ({
          ...s,
          name: `${s.name}`,
          agentCount: s.agents.length,
        }));

        if (isCollectionSupervisor()) {
          // Show only the logged-in supervisor
          setSupervisors(mapped.filter((s) => s.id === user?.id));
        } else {
          setSupervisors(mapped);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSupervisors();
  }, [user]);

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
            <Typography variant="h4">{value}</Typography>
          </Box>
          <Box sx={{ color: `${color}.main` }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  const SupervisorCard = ({ supervisor }: { supervisor: SupervisorBox }) => {
    const isExpanded = expanded === supervisor.id;
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6">{supervisor.name}</Typography>
              <Typography color="textSecondary">Agents</Typography>
              <Typography variant="h4">{supervisor.agentCount}</Typography>
            </Box>
            {supervisor.agentCount > 0 && (
              <Button
                onClick={() => setExpanded(isExpanded ? null : supervisor.id)}
              >
                {isExpanded ? "Hide Agents" : "Show Agents"}
              </Button>
            )}
          </Box>
          {supervisor.agentCount > 0 && (
            <Collapse in={isExpanded}>
              <List dense>
                {supervisor.agents.map((a) => (
                  <ListItem key={a.id}>
                    <ListItemText>
                      <Typography color="h6">{`${a.name}`}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) return <LinearProgress />;

  if (error)
    return (
      <Box>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Overview
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Welcome back, {user?.firstName}! Here's your user overview for your
        agency.
      </Typography>

      {isAdmin() && stats && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<People fontSize="large" />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Collection Supervisors"
              value={stats.collectionSupervisors}
              icon={<SupervisorAccount fontSize="large" />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Agents"
              value={stats.agents}
              icon={<Person fontSize="large" />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Admins"
              value={stats.admins}
              icon={<People fontSize="large" />}
              color="error"
            />
          </Grid>
        </Grid>
      )}

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {supervisors.map((s) => (
            <Grid item xs={12} sm={6} md={4} key={s.id}>
              <SupervisorCard supervisor={s} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Overview;
