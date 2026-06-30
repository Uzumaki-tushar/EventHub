import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

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
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex justify-center items-center px-4">

    {/* Background Glow Effects */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

    <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full blur-[120px] opacity-20"></div>

    <form
      onSubmit={handleLogin}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-white"
    >
      <div className="text-center mb-8">
        <h1 className="text-5xl mb-2">🎫</h1>

        <h2 className="text-3xl font-bold">
          Welcome Back
        </h2>

        <p className="text-gray-300 mt-2">
          Login to EventHub
        </p>
      </div>

      <input
        type="email"
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="📧 Email Address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="🔒 Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition duration-300 shadow-lg"
      >
        Login
      </button>

      <div className="text-center mt-6">
        <p className="text-gray-300">
          Don't have an account?
        </p>

        <Link
  to="/register"
  className="text-cyan-400 font-semibold hover:text-cyan-300"
>
  Register Here
</Link>
      </div>

    </form>
  </div>
);
}

export default Login;