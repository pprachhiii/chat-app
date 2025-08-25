import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

// ✅ Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const ForgetPasswordPage = lazy(() => import("./pages/ForgetPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const OpVerificationPage = lazy(() => import("./pages/OpVerifiactonPage"));

const ProtectedRoute = ({ children, authUser }) => {
  return authUser ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children, authUser }) => {
  return !authUser ? children : <Navigate to="/" replace />;
};

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <Loader className="size-10 animate-spin text-primary" />
        <p className="text-sm text-base-content/70">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      {/* Suspense fallback while lazy pages load */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader className="size-8 animate-spin text-primary" />
          </div>
        }
      >
        <Routes>
          {/* Protected routes */}
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

          {/* Public routes */}
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
            path="/verify-email"
            element={
              <PublicRoute authUser={authUser}>
                <VerifyEmailPage />
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
          <Route
            path="/op-verification"
            element={
              <PublicRoute authUser={authUser}>
                <OpVerificationPage />
              </PublicRoute>
            }
          />

          {/* Catch-all → redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
