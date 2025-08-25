import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  AtSign,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { useState } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!/^[a-z0-9_.-]+$/i.test(formData.username))
      return toast.error("Username has invalid characters");
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await signup(formData);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      if (err?.message) toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">
      {/* Left Form Section */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-10">
          {/* Header */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-lg 
                transition-transform duration-300 hover:scale-105 hover:bg-blue-500 group"
              >
                <MessageSquare className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h1 className="text-3xl font-extrabold mt-2 text-gray-800">
                Create Your Account
              </h1>
              <p className="text-gray-600 max-w-xs">
                Explore, experiment, and share your ideas.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              {
                label: "Username",
                placeholder: "Enter Your Username",
                icon: AtSign,
                value: formData.username,
                onChange: (v) =>
                  setFormData({ ...formData, username: v.toLowerCase() }),
              },
              {
                label: "Full Name",
                placeholder: "Enter Your Name",
                icon: User,
                value: formData.fullName,
                onChange: (v) => setFormData({ ...formData, fullName: v }),
              },
              {
                label: "Email",
                placeholder: "you@example.com",
                icon: Mail,
                value: formData.email,
                onChange: (v) => setFormData({ ...formData, email: v }),
              },
            ].map((field, idx) => {
              const Icon = field.icon;
              return (
                <div key={idx} className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">
                    {field.label}
                  </label>
                  <div className="relative">
                    <Icon className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
                    <input
                      type={field.label === "Email" ? "email" : "text"}
                      placeholder={field.placeholder}
                      className="w-full pl-12 py-3 rounded-2xl bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </div>
                </div>
              );
            })}

            {/* Password */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-transform hover:scale-105 shadow-md"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-2">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Illustration */}
      <AuthImagePattern
        title="Welcome! Explore this project."
        subtitle="Dive in, explore, and share your thoughts."
      />
    </div>
  );
};

export default SignUpPage;
