import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SEO from "../components/SEO";

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
      <SEO title="Create Admin" />
      <div className="flex justify-center items-center py-12">
        <form
          onSubmit={submitForm}
          className="bg-[#111111] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative"
        >
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D80032] rounded-full blur-[80px] opacity-20 pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
             <div className="w-14 h-14 bg-gradient-to-tr from-[#D80032] to-[#800080] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(216,0,50,0.5)]">
              <span className="font-bold text-2xl text-white">👤</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Create Admin</h2>
            <p className="text-gray-400 mt-2 text-sm">Register a new administrator</p>
          </div>

          <div className="space-y-4 mb-6 relative z-10">
            <input
              className="w-full px-6 py-4 rounded-full bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              className="w-full px-6 py-4 rounded-full bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              className="w-full px-6 py-4 rounded-full bg-[#0a0a0a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D80032]/50 transition-colors"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="relative z-10 space-y-3">
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#D80032] text-white font-bold hover:bg-[#a60026] transition shadow-lg"
            >
              Create Admin
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="w-full py-4 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition border border-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAdmin;
