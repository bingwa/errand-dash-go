
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import Home from "./pages/Home";
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

export default function App() {
  const [user, setUser] = useState<{ role: "user" | "errander", name: string } | null>(null);

  const handleSignIn = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TaskProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar signedIn={!!user} role={user?.role} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Home onSignIn={handleSignIn} />} />
              <Route path="/dashboard" element={
                user?.role === "user"
                  ? <UserDashboard />
                  : user?.role === "errander"
                  ? <ErranderDashboard />
                  : <Navigate to="/" />
              } />
              <Route path="/book" element={user?.role === "user" ? <BookErrand /> : <Navigate to="/" />} />
              <Route path="/tasks" element={user?.role === "errander" ? <Tasks /> : <Navigate to="/" />} />
              <Route path="/directions" element={user?.role === "errander" ? <ErranderDirections /> : <Navigate to="/" />} />
              <Route path="/wallet" element={user?.role === "errander" ? <WalletPage /> : <Navigate to="/" />} />
              <Route path="/tracking" element={user?.role === "user" ? <Tracking /> : <Navigate to="/" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
              <Route path="/settings" element={user ? <Settings /> : <Navigate to="/" />} />
              <Route path="/chat/:taskId" element={user ? <Chat /> : <Navigate to="/" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
