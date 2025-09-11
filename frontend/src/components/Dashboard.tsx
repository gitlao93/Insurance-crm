"use client";

import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Policy as PolicyIcon,
  PersonAdd as PersonAddIcon,
  Collections as CollectionsIcon,
  Settings,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useRoleAccess } from "../hooks/useRoleAccess";

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const {
    canAccessClients,
    canAccessPolicyHolders,
    canAddUsers,
    canAccessCollections,
  } = useRoleAccess();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Overview",
      icon: <DashboardIcon />,
      path: "/dashboard/overview",
      show: true, // Everyone can access overview
    },
    {
      text: "Lead",
      icon: <PeopleIcon />,
      path: "/dashboard/lead",
      show: canAccessClients(),
    },
    {
      text: "Policy Holder",
      icon: <PolicyIcon />,
      path: "/dashboard/policy-holder",
      show: canAccessPolicyHolders(),
    },
    {
      text: "User",
      icon: <PersonAddIcon />,
      path: "/dashboard/user",
      show: canAddUsers(),
    },
    {
      text: "Collection",
      icon: <CollectionsIcon />,
      path: "/dashboard/collection",
      show: canAccessCollections(),
    },
    {
      text: "Agency",
      icon: <Settings />,
      path: "/dashboard/agency",
      show: user?.role === "admin",
    },
  ];

  const visibleMenuItems = menuItems.filter((item) => item.show);

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

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography variant="h6" noWrap component="div">
            {user?.agency?.agencyName}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Insurance CRM
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {visibleMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="textSecondary"
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Welcome! {user?.firstName} {user?.lastName}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="body2"></Typography>
              <Chip
                label={user?.role?.replace("_", " ").toUpperCase()}
                size="small"
                color={getRoleColor(user?.role || "")}
                variant="outlined"
                sx={{
                  color: "textSecondary",
                  borderColor: "rgba(255, 0, 0, 0.5)",
                }}
              />
            </Box>
            <Button color="warning" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
