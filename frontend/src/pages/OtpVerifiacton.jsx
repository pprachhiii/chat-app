import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";
import { KeyRound, Loader2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search] = useSearchParams();

  const emailFromState = location.state?.email || search.get("email") || "";
  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!emailFromState) {
      // allow manual typing if user opened page directly
    }
  }, [emailFromState]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email || !otp) return toast.error("Email and OTP are required");
    setLoading(true);
    try {
      await axiosInstance.post("/auth/verify-login-otp", {
        email,
        otp,
      });

      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to verify OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-base-200 rounded-xl p-6">
        <div className="flex flex-col items-center text-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold">Verify OTP</h1>
          <p className="text-sm text-base-content/60">
            We sent a 6-digit code to your email
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="label text-sm">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-base-content/40" />
              <input
                type="email"
                className="input input-bordered w-full pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="label text-sm">
              <span className="label-text">One-Time Password</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full tracking-widest text-center"
              placeholder="123456"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
              </>
            ) : (
              "Verify & Continue"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <Link to="/login" className="link link-primary">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
