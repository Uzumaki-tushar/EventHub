import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");

    if (admin) {
      navigate("/admin");
    } else if (token) {
      navigate("/events");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;
      login(user, token);

      toast.success("Welcome back!");

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || "Login Failed";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <SEO title="Login" />
      <div className="min-h-[90vh] flex justify-center items-center px-4 relative">

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleLogin}
          className="bg-[#111111] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md text-white relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#D80032] to-[#800080] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(216,0,50,0.5)]">
              <span className="font-bold text-3xl text-white">E</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-gray-400 mt-2 text-sm">Sign in to your EventHub account</p>
          </div>

          <div className="space-y-4 mb-6">
            <input
              type="email"
              className="w-full px-6 py-4 rounded-full bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full px-6 py-4 rounded-full bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#D80032] text-white font-bold hover:bg-[#a60026] transition duration-300 shadow-[0_4px_14px_0_rgba(216,0,50,0.39)] hover:shadow-[0_6px_20px_rgba(216,0,50,0.23)] hover:-translate-y-0.5"
          >
            Sign In
          </button>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#D80032] font-semibold hover:text-white transition-colors">
                Create one
              </Link>
            </p>
          </div>

        </motion.form>
      </div>
    </>
  );
}

export default Login;