import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await API.post(
        "/auth/register",
        form
      );

      toast.success("🎉 Registration Successful!");
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Registration Failed";
      toast.error(errMsg);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex justify-center items-center px-4">

    {/* Background Glow Effects */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

    <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full blur-[120px] opacity-20"></div>

    <form
      onSubmit={submitForm}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-white"
    >
      <div className="text-center mb-8">
        <h1 className="text-5xl mb-2">🎫</h1>

        <h2 className="text-3xl font-bold">
          Create Account
        </h2>

        <p className="text-gray-300 mt-2">
          Join EventHub Today
        </p>
      </div>

      <input
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="👤 Full Name"
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        type="email"
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="📧 Email Address"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-6 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="🔒 Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition duration-300 shadow-lg"
      >
        Create Account
      </button>

      <div className="text-center mt-6">
        <p className="text-gray-300">
          Already have an account?
        </p>

        <Link
  to="/login"
  className="text-cyan-400 font-semibold hover:text-cyan-300"
>
  Login Here
</Link>
      </div>

    </form>

  </div>
);
}

export default Register;