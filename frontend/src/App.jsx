import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUp.jsx"));
const LoginPage = lazy(() => import("./pages/Login.jsx"));
const SettingsPage = lazy(() => import("./pages/Settings.jsx"));
const ProfilePage = lazy(() => import("./pages/Profile.jsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPassword.jsx"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePassword.jsx"));

const ProtectedRoute = ({ children, authUser }) =>
  !authUser ? <Navigate to="/login" replace /> : children;

const PublicRoute = ({ children, authUser }) =>
  authUser ? <Navigate to="/" replace /> : children;

const App = () => {
  const { authUser, restoreSession } = useAuthStore();
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const init = async () => {
      await restoreSession();
      setLoadingSession(false);
    };
    init();
  }, [restoreSession]);

  if (loadingSession) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Add padding-top to offset navbar height */}
      <div className="pt-16">
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
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
