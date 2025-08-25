import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, LogIn } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-gray-50 border-b border-gray-200 fixed w-full top-0 z-40 backdrop-blur-lg bg-white/80 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-all"
        >
          <div className="w-10 h-10 rounded-3xl bg-blue-100 flex items-center justify-center shadow-md transition-transform hover:scale-105">
            <MessageSquare className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Chat</h1>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {authUser ? (
            <>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-blue-100 transition"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="hidden sm:inline text-gray-700 font-medium">
                  Settings
                </span>
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-blue-100 transition"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span className="hidden sm:inline text-gray-700 font-medium">
                  Profile
                </span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-red-100 transition"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="hidden sm:inline text-red-500 font-medium">
                  Logout
                </span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 transition"
              >
                <LogIn className="w-5 h-5 text-blue-500" />
                <span className="hidden sm:inline text-blue-600 font-medium">
                  Login
                </span>
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 transition"
              >
                <User className="w-5 h-5 text-blue-500" />
                <span className="hidden sm:inline text-blue-600 font-medium">
                  Signup
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
