import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUp.jsx"));
const LoginPage = lazy(() => import("./pages/Login.jsx"));
const SettingsPage = lazy(() => import("./pages/Settings.jsx"));
const ProfilePage = lazy(() => import("./pages/Profile.jsx"));
const ForgetPasswordPage = lazy(() => import("./pages/ForgetPassword.jsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPassword.jsx"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePassword.jsx"));

const ProtectedRoute = ({ children, authUser }) =>
  !authUser ? <Navigate to="/login" replace /> : children;
const PublicRoute = ({ children, authUser }) =>
  authUser ? <Navigate to="/" replace /> : children;

const App = () => {
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader className="size-8 animate-spin text-primary" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute authUser={authUser}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute authUser={authUser}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute authUser={authUser}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute authUser={authUser}>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute authUser={authUser}>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute authUser={authUser}>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute authUser={authUser}>
                <ForgetPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute authUser={authUser}>
                <ResetPasswordPage />
              </PublicRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
