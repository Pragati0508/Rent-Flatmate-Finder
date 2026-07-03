import { Routes, Route, Navigate } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import OwnerDashboard from "./pages/OwnerDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import Admin from "./pages/Admin";

// Owner Pages
import OwnerListings from "./pages/OwnerListings";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import OwnerRequests from "./pages/OwnerRequests";
import OwnerProfile from "./pages/OwnerProfile";

// Tenant Pages
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
import AIMatches from "./pages/AIMatches";
import MyRequests from "./pages/MyRequests";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
// Shared
import Chat from "./pages/Chat";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* ================= HOME ================= */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* ================= AUTH ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* =======================================================
                          OWNER ROUTES
      ======================================================== */}

      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/listings"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerListings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/create-listing"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <CreateListing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/edit-listing/:id"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <EditListing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/requests"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/profile"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerProfile />
          </ProtectedRoute>
        }
      />
      <Route
  path="/admin/analytics"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Analytics />
    </ProtectedRoute>
  }
/>

      {/* =======================================================
                         TENANT ROUTES
      ======================================================== */}

      <Route
        path="/tenant"
        element={
          <ProtectedRoute allowedRoles={["tenant"]}>
            <TenantDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenant/listings"
        element={
          <ProtectedRoute allowedRoles={["tenant"]}>
            <Listings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenant/matches"
        element={
          <ProtectedRoute allowedRoles={["tenant"]}>
            <AIMatches />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenant/requests"
        element={
          <ProtectedRoute allowedRoles={["tenant"]}>
            <MyRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenant/profile"
        element={
          <ProtectedRoute allowedRoles={["tenant"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/listing/:id"
        element={
          <ProtectedRoute allowedRoles={["tenant"]}>
            <ListingDetails />
          </ProtectedRoute>
        }
      />

      {/* =======================================================
                          CHAT
      ======================================================== */}

      <Route
        path="/chat/:receiverId/:listingId"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      {/* =======================================================
                          ADMIN
      ======================================================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      {/* =======================================================
                     SHARED ROUTES
      ======================================================== */}

      <Route
        path="/listings"
        element={
          <ProtectedRoute>
            <Listings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/matches"
        element={
          <ProtectedRoute>
            <AIMatches />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;