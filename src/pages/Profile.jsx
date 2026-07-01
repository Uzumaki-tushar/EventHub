import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";
import SEO from "../components/SEO";
import { motion } from "framer-motion";

function Profile() {
  const { user, login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/auth/profile/${user._id}`, formData);
      toast.success("Profile updated successfully!");
      const updatedUser = res.data;
      const token = localStorage.getItem("token");
      login(updatedUser, token);
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (!user) return null;

  return (
    <>
      <SEO title="Profile" />
      <div className="min-h-[90vh] py-12 px-6 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-[#111111] border border-white/10 rounded-[2.5rem] p-10 mt-10 relative overflow-hidden"
        >

          <div className="flex flex-col md:flex-row items-center gap-10 mb-10 relative z-10">
            <div className="relative">
              <img 
                src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                alt="Profile" 
                className="w-40 h-40 rounded-full border-4 border-[#111] shadow-[0_0_0_2px_rgba(216,0,50,0.5)] object-cover bg-[#222]"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black mb-1">
                {user.name}
              </h1>
              <p className="text-[#D80032] font-medium">{user.email}</p>
              <p className="mt-4 text-gray-400 max-w-md text-sm leading-relaxed">{user.bio || "No bio added yet. Tell people about yourself!"}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-10 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Profile Details</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-bold transition-colors"
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>

            {isEditing && (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onSubmit={handleUpdate} 
                className="space-y-5"
              >
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Display Name</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white focus:outline-none focus:border-[#D80032]/50"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Bio</label>
                  <textarea
                    rows="3"
                    className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white focus:outline-none focus:border-[#D80032]/50 resize-none"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Profile Picture URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full px-6 py-4 rounded-xl bg-[#0a0a0a] border border-white/5 text-white focus:outline-none focus:border-[#D80032]/50"
                    value={formData.profilePicture}
                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="py-4 px-8 rounded-full bg-[#D80032] text-white font-bold hover:bg-[#a60026] transition shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </motion.form>
            )}
          </div>

        </motion.div>
      </div>
    </>
  );
}

export default Profile;
