import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");

    try {
      await login(formData);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-gray-50">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-500 group">
                <MessageSquare className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h1 className="text-3xl font-extrabold mt-2 text-gray-800">
                Welcome Back
              </h1>
              <p className="text-gray-600 max-w-xs">
                Explore, experiment, and share your ideas.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 py-3 rounded-2xl bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 py-3 rounded-2xl bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-transform hover:scale-105 shadow-md"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Links */}
          <div className="flex flex-col items-center text-center mt-2 space-y-2">
            <Link
              to="/reset-password"
              className="text-blue-500 font-medium hover:underline"
            >
              Forgot password?
            </Link>
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 font-medium hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right image section */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Dive in, explore, and share your thoughts."
      />
    </div>
  );
};

export default LoginPage;
