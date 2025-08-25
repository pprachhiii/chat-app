import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import toast from "react-hot-toast";

const ChangePasswordPage = () => {
  const { changePassword, isChangingPassword } = useAuthStore();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }

    if (form.newPassword !== form.retypePassword) {
      return toast.error("Passwords do not match");
    }

    await changePassword(form);
    setForm({ currentPassword: "", newPassword: "", retypePassword: "" });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-extrabold text-gray-800 text-center">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-2 flex items-center gap-1">
              <Lock className="w-4 h-4" /> Current Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-2 flex items-center gap-1">
              <Lock className="w-4 h-4" /> New Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Retype New Password */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-2 flex items-center gap-1">
              <Lock className="w-4 h-4" /> Retype New Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={form.retypePassword}
                onChange={(e) =>
                  setForm({ ...form, retypePassword: e.target.value })
                }
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isChangingPassword}
            className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-transform hover:scale-105 shadow-md flex items-center justify-center"
          >
            {isChangingPassword ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Updating...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
