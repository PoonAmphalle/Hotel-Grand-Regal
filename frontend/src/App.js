import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Auth pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageMenu from "./pages/admin/ManageMenu";

// Customer pages
import Home from "./pages/customer/Home";
import Rooms from "./pages/customer/Rooms";
import RoomDetails from "./pages/customer/RoomDetails";
import Dining from "./pages/customer/Dining";
import DishDetail from "./pages/customer/DishDetail";

// Common pages
import About from "./pages/common/About";
import Banquet from "./pages/common/Banquet";
import Contact from "./pages/common/Contact";
import NotFound from "./pages/common/NotFound";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/rooms"
            element={
              <ProtectedRoute>
                <ManageRooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <ProtectedRoute>
                <ManageMenu />
              </ProtectedRoute>
            }
          />

          {/* Customer */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/dining/:id" element={<DishDetail />} />

          {/* Common */}
          <Route path="/about" element={<About />} />
          <Route path="/banquet" element={<Banquet />} />
          <Route path="/contact" element={<Contact />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
