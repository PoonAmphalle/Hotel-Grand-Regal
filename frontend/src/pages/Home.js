import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="bg-dark text-white d-flex align-items-center justify-content-center"
        style={{
          height: "70vh",
          backgroundImage: "url('/images/hotel-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center bg-dark bg-opacity-50 p-4 rounded">
          <h1 className="display-4 fw-bold">Welcome to Hotel Grand Regal</h1>
          <p className="lead">Luxury • Comfort • Elegance</p>
          <div className="mt-3">
            <Link to="/rooms" className="btn btn-primary btn-lg me-3">
              Explore Rooms
            </Link>
            <Link to="/dining" className="btn btn-outline-light btn-lg">
              Dine With Us
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container my-5 text-center">
        <h2>Experience Luxury Like Never Before</h2>
        <p className="mt-3">
          At Hotel Grand Regal, we pride ourselves on delivering world-class
          hospitality with a touch of elegance. Whether you are here to relax,
          celebrate, or work, our services are tailored to make your stay
          unforgettable.
        </p>
      </div>
    </div>
  );
}

export default Home;
