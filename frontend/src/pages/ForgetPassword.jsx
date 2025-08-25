import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isResettingPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({ email });
    setEmail("");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-extrabold text-gray-800 text-center">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-2 flex items-center gap-1">
              <Mail className="w-4 h-4" /> Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isResettingPassword}
            className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-transform hover:scale-105 shadow-md flex items-center justify-center"
          >
            {isResettingPassword ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Sending...
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
