import React, { useState, useEffect } from "react";
import useUserStore from "../../stores/userStore";
import { updateUserProfile, deleteUserProfile } from "../../api/apiMain";
import { toast } from "react-toastify";

const ProfilePage: React.FC = () => {
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const userModels = useUserStore((state) => state.userModels);
  const fetchUserModels = useUserStore((state) => state.fetchUserModels);
  const createUserModelStore = useUserStore((state) => state.createUserModel);
  const deleteUserModelStore = useUserStore((state) => state.deleteUserModel);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const setUpdateUser = useUserStore((state) => state.setUpdateUser);

  const [editData, setEditData] = useState({
    username: user?.username || "Username",
    email: user?.email || "trader@example.com",
  });

  useEffect(() => {
    fetchUserModels();
  }, []);

  const handleUserEdit = async () => {
    try {
      // console.log(userModels)
      const resp = await updateUserProfile(user!.id, editData);
      const freshUser = resp.data.user;

      // Update global store
      setUpdateUser(freshUser);

      // Sync local state for next edit
      setEditData({
        username: freshUser.username,
        email: freshUser.email,
      });

      toast.success(resp.data.message || "Profile updated successfully");
      setIsEditing(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const hdlDeleteUser = async () => {
    console.log("delete")
    try {
      await deleteUserProfile();
      toast.success("This account got delete")
      logout();
    } catch (err) {
      console.dir(err);
      const errMsg = err.response?.data.message || err.message;
      // alert(JSON.stringify(err,null,2))
      toast.error(errMsg,);
    }
  };

  const [newModel, setNewModel] = useState("");
  const [showModelInput, setShowModelInput] = useState(false);

  const handleAddModel = async () => {
    if (newModel.trim()) {
      try {
        await createUserModelStore({ name: newModel.trim(), userId: user.userId });
        toast.success("Model added successfully");
        setNewModel("");
        setShowModelInput(false);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to add model");
      }
    }
  };

  const handleDeleteModel = async (id: number) => {
    console.log(id)
    if (window.confirm("Are you sure you want to delete this model?")) {
      try {
        await deleteUserModelStore(id);
        toast.success("Model deleted successfully");
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to delete model");
      }
    }
  };

  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] font-body selection:bg-[#9cff93] selection:text-[#006413] min-h-screen">
      {/* <button onClick={logAllApiData}>Click</button> */}
      <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-800 pb-8">
          <h1 className="font-headline font-bold text-3xl tracking-tight uppercase mb-2">
            Trader Profile
          </h1>
          <p className="text-[#adaaaa] font-label text-sm tracking-widest uppercase">
            Account Management & Trading Systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column: Personal Info */}
          <div className="md:col-span-2 space-y-12">
            <section className="bg-[#131313] rounded-3xl p-8 border border-gray-800/50 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline font-bold text-xl uppercase tracking-tight">
                  Account Details
                </h2>
                <button
                  onClick={() => {
                    if (!isEditing) {
                      setEditData({
                        username: user?.username || "Username",
                        email: user?.email || "trader@example.com",
                      });
                    }
                    setIsEditing(!isEditing);
                  }}
                  className="text-[#9cff93] font-label text-sm uppercase tracking-widest hover:underline"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block font-label text-[11px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Username
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                      className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#9cff93] outline-none transition-all"
                    />
                  ) : (
                    <p className="text-xl font-medium">
                      {user?.username || "Username"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-label text-[11px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#9cff93] outline-none transition-all"
                    />
                  ) : (
                    <p className="text-xl font-medium">
                      {user?.email || "trader@example.com"}
                    </p>
                  )}
                </div>

                {isEditing && (
                  <button
                    onClick={handleUserEdit}
                    className="bg-gradient-to-br from-[#9cff93] to-[#00fc40] text-[#006413] font-label font-bold px-8 py-3 rounded-xl uppercase tracking-widest text-sm mt-4 active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </section>

            {/* Model Setup Section */}
            <section className="bg-[#131313] rounded-3xl p-8 border border-gray-800/50 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline font-bold text-xl uppercase tracking-tight">
                  Model Setup
                </h2>
                <button
                  onClick={() => setShowModelInput(!showModelInput)}
                  className="bg-[#9cff93]/10 text-[#9cff93] border border-[#9cff93]/20 font-label text-[10px] uppercase tracking-widest px-4 py-2 rounded-full hover:bg-[#9cff93]/20 transition-all"
                >
                  {showModelInput ? "Cancel" : "+ Add Model"}
                </button>
              </div>

              {showModelInput && (
                <div className="flex gap-3 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                  <input
                    type="text"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    placeholder="Enter model name (e.g. ICT Silver Bullet)"
                    className="flex-1 bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-[#9cff93] outline-none transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handleAddModel()}
                  />
                  <button
                    onClick={handleAddModel}
                    className="bg-[#9cff93] text-[#006413] font-label font-bold px-6 py-3 rounded-xl uppercase tracking-widest text-xs"
                  >
                    Add
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userModels.map((model: any, index: number) => (
                  <div
                    key={model.id || index}
                    className="bg-[#1a1919] border border-gray-800 p-4 rounded-2xl flex justify-between items-center group hover:border-[#9cff93]/30 transition-all"
                  >
                    <span className="font-medium">{model.name}</span>
                    <button
                      onClick={() => handleDeleteModel(model.id)}
                      className="text-gray-600 hover:text-[#ff716c] transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg text-[#ff716c]">
                        delete
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Security/Danger Zone */}
          <div className="space-y-8">
            <section className="bg-[#131313] border border-red-900/20 rounded-3xl p-8 shadow-xl">
              <h2 className="font-headline font-bold text-lg uppercase tracking-tight text-[#ff716c] mb-6">
                Danger Zone
              </h2>
              <p className="text-xs text-[#adaaaa] mb-8 leading-relaxed">
                Permanently delete your account and all associated trading data.
                This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-[#ff716c]/5 border border-[#ff716c]/20 text-[#ff716c] font-label font-bold py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-[#ff716c]/10 transition-all"
              >
                Delete Account
              </button>
            </section>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <div className="bg-[#131313] border-2 border-red-900/30 rounded-3xl p-10 max-w-md w-full shadow-[0_0_64px_rgba(255,113,108,0.1)]">
              <div className="flex justify-center mb-6">
                <span className="material-symbols-outlined text-6xl text-[#ff716c]">
                  warning
                </span>
              </div>
              <h2 className="text-2xl font-headline font-bold mb-4 text-center uppercase tracking-tight">
                Confirm Deletion
              </h2>
              <p className="text-[#adaaaa] text-center mb-10 leading-relaxed">
                Are you absolutely sure? All your journals, charts, and
                performance history will be wiped from our servers.
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="py-4 rounded-xl font-label font-bold uppercase tracking-widest text-sm bg-[#1a1919] hover:bg-[#262626] text-white transition-all"
                >
                  No, Keep My Account
                </button>
                <button
                  onClick={() => hdlDeleteUser()}
                  className="py-4 rounded-xl font-label font-bold uppercase tracking-widest text-sm bg-[#a55f5d] text-white hover:brightness-140 transition-all shadow-lg shadow-red-900/20"
                >
                  Yes, Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
