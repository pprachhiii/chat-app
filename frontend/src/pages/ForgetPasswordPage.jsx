import { useState } from "react";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", previousPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.message || "Failed to verify previous password");
      toast.success("Verified. Set your new password");
      navigate(`/reset-password?token=${data.resetToken}`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-base-200 rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-sm">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-base-content/40" />
              <input
                type="email"
                className="input input-bordered w-full pl-9"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="label text-sm">
              <span className="label-text">Previous Password</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-base-content/40" />
              <input
                type="password"
                className="input input-bordered w-full pl-9"
                placeholder="••••••••"
                value={form.previousPassword}
                onChange={(e) =>
                  setForm({ ...form, previousPassword: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
