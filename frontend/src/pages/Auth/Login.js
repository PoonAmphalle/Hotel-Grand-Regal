import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use shared API client so baseURL points to backend in Docker
      const payload = { email: email.trim(), password };
      setError("");
      setLoading(true);
      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem("token", data.token);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/customer/home");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-3 text-center">Login</h3>
              {error && (
                <div className="alert alert-danger py-2" role="alert">{error}</div>
              )}
              <form onSubmit={handleLogin} className="d-grid gap-3">
                <div>
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
