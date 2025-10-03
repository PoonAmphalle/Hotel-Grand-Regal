import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Rooms from "./pages/Rooms";
import AddRoom from "./pages/AddRoom";
import RoomDetails from "./pages/RoomDetails";
import Dining from "./pages/Dining";
import AddMenu from "./pages/AddMenu";
import ManageMenu from "./pages/ManageMenu";
import ManageRooms from "./pages/ManageRooms";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Banquet from "./pages/Banquet";
import Footer from "./components/Footer";
import "./App.css";


function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Hotel Grand Regal</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/rooms">Rooms</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dining">Dining</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/add-room">Add Room</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/add-menu">Add Menu</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/manage-menu">Manage Menu</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/manage-rooms">Manage Rooms</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/banquet">Banquet Hall</Link></li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="container mt-4">
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/add-menu" element={<AddMenu />} />
          <Route path="/manage-menu" element={<ManageMenu />} />
          <Route path="/manage-rooms" element={<ManageRooms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/banquet" element={<Banquet />} />

        </Routes>
      
      </div>
        <Footer />
    </div>
  );
}

export default App;
