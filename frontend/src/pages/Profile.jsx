import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [bio, setBio] = useState(authUser?.bio || "");
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [saving, setSaving] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      try {
        const updatedUser = await updateProfile({ profilePic: base64Image });
        setSelectedImg(updatedUser?.profilePic?.url);
      } catch (err) {
        toast.error(err.message || "Failed to upload profile picture");
      }
    };
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateProfile({ fullName, bio });
      toast.success("Profile updated");
    } catch (e) {
      if (e?.message) toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-2xl space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic?.url || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-gray-800 hover:bg-gray-700 p-2 rounded-full cursor-pointer transition-transform duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border rounded-2xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <p className="w-full px-4 py-3 border rounded-2xl bg-gray-100 text-gray-700">
                {authUser?.email}
              </p>
            </div>

            {/* Bio */}
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4" /> Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                maxLength={200}
                placeholder="Hey there! I'm studying"
                className="w-full px-4 py-3 border rounded-2xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              />
              <div className="text-xs text-gray-400 text-right mt-1">
                {bio.length}/200
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProfile}
              disabled={saving || isUpdatingProfile}
              className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow-md transition-transform hover:scale-105 flex items-center justify-center"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-gray-50 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Account Information
            </h2>
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
