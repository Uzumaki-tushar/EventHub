import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

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
      // Update local storage and context
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
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white p-8 flex justify-center">
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl mt-10">
          
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img 
              src={user.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
              alt="Profile" 
              className="w-40 h-40 rounded-full border-4 border-cyan-400 object-cover shadow-2xl"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {user.name}
              </h1>
              <p className="text-gray-300 mt-2">{user.email}</p>
              <p className="mt-4 italic text-gray-400 max-w-md">{user.bio || "No bio added yet."}</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl text-sm font-bold transition"
              >
                {isEditing ? "Cancel" : "Edit Details"}
              </button>
            </div>

            {isEditing && (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-400"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Bio</label>
                  <textarea
                    rows="3"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-400"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Profile Picture URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-cyan-400"
                    value={formData.profilePicture}
                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 font-bold hover:scale-105 transition"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;
