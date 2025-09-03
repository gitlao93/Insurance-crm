import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Overview from "./pages/Overview";
import Client from "./pages/Client";
import PolicyHolder from "./pages/PolicyHolder";
import AddUser from "./pages/AddUser";
import Collection from "./pages/Collection";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="/dashboard/overview" replace />}
          />
          <Route
            path="overview"
            element={
              <ProtectedRoute
                roles={["admin", "agent", "collection_supervisor"]}
              >
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route
            path="client"
            element={
              <ProtectedRoute roles={["admin", "agent"]}>
                <Client />
              </ProtectedRoute>
            }
          />
          <Route
            path="policy-holder"
            element={
              <ProtectedRoute
                roles={["admin", "agent", "collection_supervisor"]}
              >
                <PolicyHolder />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-user"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="collection"
            element={
              <ProtectedRoute roles={["admin", "collection_supervisor"]}>
                <Collection />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
