import React from "react";

function Banquet() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Banquet Hall</h2>
      <p>
        Our <strong>Grand Regal Banquet Hall</strong> is the perfect venue for weddings, 
        corporate events, and celebrations. With modern interiors, customizable décor, 
        and a dedicated events team, we ensure your special occasion is unforgettable.
      </p>

      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src="/images/banquet1.jpg"
            alt="Banquet Hall"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item">Capacity: 300 Guests</li>
            <li className="list-group-item">Modern Lighting & Sound System</li>
            <li className="list-group-item">Customizable Seating Arrangements</li>
            <li className="list-group-item">Catering & Decoration Services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Banquet;
