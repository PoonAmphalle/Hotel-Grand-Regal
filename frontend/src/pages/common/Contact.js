import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', msg: string }

  // EmailJS credentials
  const SERVICE_ID = "service_0mlm5lb";
  const TEMPLATE_ID = "template_qrz1k2a";
  const PUBLIC_KEY = "TjAypku5PFtaDWomD";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // Send multiple common fields so the template matches
          name: form.name,
          email: form.email,
          message: form.message,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus({ type: "success", msg: "Message sent successfully! We’ll contact you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus({
        type: "error",
        msg: `Failed to send: ${err?.text || err?.message || "Unknown error"}`,
      });
    } finally {
      setSending(false);
    }
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

        <button className="btn btn-primary w-100" type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <div
            className={`alert mt-3 ${status.type === "success" ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {status.msg}
          </div>
        )}
      </form>

      {/* Address/phone/email removed here to avoid duplication with footer */}

    </div>
  );
}

export default Contact;