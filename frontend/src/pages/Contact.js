import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We will contact you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="form-control mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="form-control mb-3"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button className="btn btn-primary w-100" type="submit">
          Send Message
        </button>
      </form>

      <div className="text-center mt-5">
        <h5>📍 Address: 123 Grand Regal Street, City</h5>
        <h5>📞 Phone: +91 98765 43210</h5>
        <h5>✉️ Email: contact@grandregal.com</h5>
      </div>
    </div>
  );
}

export default Contact;
