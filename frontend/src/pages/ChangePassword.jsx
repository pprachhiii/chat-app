import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/authStore.js";
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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-base-200 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4">Change Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-sm">
              <span className="label-text">Current Password</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-base-content/40" />
              <input
                type="password"
                className="input input-bordered w-full pl-9"
                placeholder="••••••••"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="label text-sm">
              <span className="label-text">New Password</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-base-content/40" />
              <input
                type="password"
                className="input input-bordered w-full pl-9"
                placeholder="••••••••"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="label text-sm">
              <span className="label-text">Retype New Password</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-base-content/40" />
              <input
                type="password"
                className="input input-bordered w-full pl-9"
                placeholder="••••••••"
                value={form.retypePassword}
                onChange={(e) =>
                  setForm({ ...form, retypePassword: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={isChangingPassword}
          >
            {isChangingPassword ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Updating...
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
