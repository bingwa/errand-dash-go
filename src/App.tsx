
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import UserDashboard from "./pages/UserDashboard";
import ErranderDashboard from "./pages/ErranderDashboard";
import BookErrand from "./pages/BookErrand";
import Tasks from "./pages/Tasks";
import Chat from "./pages/Chat";
import Tracking from "./pages/Tracking";
import WalletPage from "./pages/Wallet";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import ErranderDirections from "./pages/ErranderDirections";

const queryClient = new QueryClient();

function AppContent() {
  const { user, userProfile, signOut, loading } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={
          user
            ? userProfile?.role === "user"
              ? <UserDashboard />
              : userProfile?.role === "errander"
              ? <ErranderDashboard />
              : <Navigate to="/auth" />
            : <Navigate to="/auth" />
        } />
        <Route path="/book" element={user && userProfile?.role === "user" ? <BookErrand /> : <Navigate to="/auth" />} />
        <Route path="/tasks" element={user && userProfile?.role === "errander" ? <Tasks /> : <Navigate to="/auth" />} />
        <Route path="/directions" element={user && userProfile?.role === "errander" ? <ErranderDirections /> : <Navigate to="/auth" />} />
        <Route path="/wallet" element={user && userProfile?.role === "errander" ? <WalletPage /> : <Navigate to="/auth" />} />
        <Route path="/tracking" element={user && userProfile?.role === "user" ? <Tracking /> : <Navigate to="/auth" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate to="/auth" />} />
        <Route path="/chat/:taskId" element={user ? <Chat /> : <Navigate to="/auth" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <TaskProvider>
              <Toaster />
              <Sonner />
              <AppContent />
            </TaskProvider>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
