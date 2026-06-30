import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminNavbar from "../components/AdminNavbar";

function CreateAdmin() {
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
      await API.post("/auth/create-admin", form);
      toast.success("🎉 Admin Created Successfully!");
      navigate("/admin");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to create admin";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

        <form
          onSubmit={submitForm}
          className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md text-white relative z-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl mb-2">👤</h1>
            <h2 className="text-3xl font-bold">Create Admin</h2>
            <p className="text-gray-300 mt-2">Register a new administrator account</p>
          </div>

          <input
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 mb-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="👤 Full Name"
            value={form.name}
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
            value={form.email}
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
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:scale-105 transition duration-300 shadow-lg cursor-pointer"
          >
            Create Admin
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="w-full mt-3 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition duration-300 cursor-pointer"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateAdmin;
