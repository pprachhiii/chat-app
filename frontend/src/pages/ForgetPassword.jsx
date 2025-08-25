import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent. Check your email.");
      // Assuming backend returns token for frontend redirect (optional)
      if (res.data?.resetToken) {
        navigate(`/reset-password?token=${res.data.resetToken}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
