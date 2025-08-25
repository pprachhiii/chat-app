import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import { CheckCircle2, Loader2, MailCheck } from "lucide-react";
import { axiosInstance } from "../lib/axios";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const sent = search.get("sent");

  const [status, setStatus] = useState(
    sent ? "sent" : token ? "verifying" : "idle"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const run = async () => {
      if (!token) return;
      try {
        await axiosInstance.get(
          `/auth/verify-email/${encodeURIComponent(token)}`
        );
        setStatus("success");
        setMessage("Email verified. You can now log in.");
      } catch (e) {
        setStatus("error");
        setMessage(
          e.response?.data?.message || e.message || "Verification failed"
        );
      }
    };
    run();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-base-200 rounded-xl p-6 text-center space-y-4">
        {status === "sent" && (
          <>
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MailCheck className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-semibold">Verify your email</h1>
            <p className="text-sm text-base-content/70">
              We just sent you a link. Click it to activate your account.
            </p>
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
          </>
        )}
        {status === "verifying" && (
          <>
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            <p>Verifying your email...</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 className="w-10 h-10 text-success mx-auto" />
            <h1 className="text-xl font-semibold">Email Verified</h1>
            <p className="text-sm">{message}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-xl font-semibold text-error">
              Verification Failed
            </h1>
            <p className="text-sm">{message}</p>
            <Link to="/signup" className="btn">
              Create Account
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default VerifyEmailPage;
