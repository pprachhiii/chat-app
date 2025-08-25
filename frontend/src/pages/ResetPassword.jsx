import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ResetPasswordPage = () => {
  const [search] = useSearchParams();
  const token = search.get("token");
  const navigate = useNavigate();
  const { resetPassword, isResettingPassword } = useAuthStore();
  const [form, setForm] = useState({ newPassword: "", retypePassword: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    if (form.newPassword.length < 6) return;
    if (form.newPassword !== form.retypePassword) return;

    await resetPassword(token, form);
    setDone(true);
    setForm({ newPassword: "", retypePassword: "" });
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-base-200 rounded-xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-success mx-auto" />
          <h1 className="text-xl font-semibold">Password Updated</h1>
          <p className="text-sm text-base-content/70">
            You can now sign in with your new password.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-base-200 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-sm">
              <span className="label-text">New Password</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-base-content/40" />
              <input
                type="password"
                className="input input-bordered w-full pl-9"
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
              <span className="label-text">Retype Password</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-base-content/40" />
              <input
                type="password"
                className="input input-bordered w-full pl-9"
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
            disabled={isResettingPassword}
          >
            {isResettingPassword ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
          {!token && (
            <p className="text-xs text-error mt-2">
              Token missing. Go back to{" "}
              <Link to="/forgot-password" className="link link-primary">
                Forgot Password
              </Link>
              .
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
