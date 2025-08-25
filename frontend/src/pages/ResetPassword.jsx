import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { resetPassword, isResettingPassword } = useAuthStore();
  const [form, setForm] = useState({
    username: "",
    newPassword: "",
    retypePassword: "",
  });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.username ||
      form.newPassword.length < 6 ||
      form.newPassword !== form.retypePassword
    )
      return;

    await resetPassword(form); // Pass username + passwords
    setDone(true);
    setForm({ username: "", newPassword: "", retypePassword: "" });
  };

  if (done) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
          <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
          <h1 className="text-2xl font-extrabold text-gray-800">
            Password Updated
          </h1>
          <p className="text-gray-500 text-sm">
            You can now sign in with your new password.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-transform hover:scale-105 shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-extrabold text-gray-800 text-center">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-2 flex items-center gap-1">
              <Lock className="w-4 h-4" /> New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Retype Password */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-2 flex items-center gap-1">
              <Lock className="w-4 h-4" /> Retype Password
            </label>
            <input
              type="password"
              placeholder="Retype new password"
              value={form.retypePassword}
              onChange={(e) =>
                setForm({ ...form, retypePassword: e.target.value })
              }
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isResettingPassword}
            className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-transform hover:scale-105 shadow-md flex items-center justify-center"
          >
            {isResettingPassword ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
