import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageMenu from "./pages/admin/ManageMenu";

// Customer pages
import Home from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute role="admin">
              <ManageRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <ProtectedRoute role="admin">
              <ManageMenu />
            </ProtectedRoute>
          }
        />

        {/* Customer routes */}
        <Route
          path="/customer/home"
          element={
            <ProtectedRoute role="customer">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/menu"
          element={
            <ProtectedRoute role="customer">
              <Menu />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
