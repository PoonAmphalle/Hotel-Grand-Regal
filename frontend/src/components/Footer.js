import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} Hotel Grand Regal. All Rights Reserved.</p>
        <p className="mb-0">
          📍 123 Grand Regal Street, City | 📞 +91 98765 43210 | ✉️ contact@grandregal.com
        </p>
      </div>
    </footer>
  );
}

export default Footer;
