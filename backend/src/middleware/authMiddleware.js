// Dummy protect and admin middleware
const protect = (req, res, next) => {
  console.log("Protect middleware running");
  next();
};

const admin = (req, res, next) => {
  console.log("Admin middleware running");
  next();
};

module.exports = { protect, admin };
