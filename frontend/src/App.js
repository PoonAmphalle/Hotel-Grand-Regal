import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageMenu from "./pages/admin/ManageMenu";

// Customer pages
import Home from "./pages/customer/Home";
import Rooms from "./pages/customer/Rooms";
import Dining from "./pages/customer/Dining";

// Common pages
import About from "./pages/common/About";
import Banquet from "./pages/common/Banquet";
import Contact from "./pages/common/Contact";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

import RoomDetails from "./pages/RoomDetails";
import NotFound from "./pages/common/NotFound";

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
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/rooms"
          element={<ProtectedRoute><ManageRooms /></ProtectedRoute>}
        />
        <Route
          path="/admin/menu"
          element={<ProtectedRoute><ManageMenu /></ProtectedRoute>}
        />

        {/* Customer */}
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/dining" element={<Dining />} />

        {/* Common */}
        <Route path="/about" element={<About />} />
        <Route path="/banquet" element={<Banquet />} />
        <Route path="/contact" element={<Contact />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />

      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
