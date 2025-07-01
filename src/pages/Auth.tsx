
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User2, Users, ArrowLeft } from "lucide-react";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "errander">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (showForgotPassword) {
        const result = await resetPassword(email);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Recovery email sent",
            description: "Please check your email for the verification code",
          });
          navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        }
      } else if (isSignUp) {
        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive"
          });
          return;
        }
        
        const result = await signUp(email, password, { name, role });
        if (result.error) {
          toast({
            title: "Error",
            description: result.error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Success",
            description: "Account created successfully! Please check your email for verification.",
          });
        }
      } else {
        const result = await signIn(email, password);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error.message,
            variant: "destructive"
          });
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 mobile-safe-area">
        <div className="max-w-md w-full">
          <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-0">
            <CardHeader className="text-center">
              <Button
                variant="ghost"
                onClick={() => setShowForgotPassword(false)}
                className="absolute left-4 top-4 p-2 dark:text-white"
              >
                <ArrowLeft size={20} />
              </Button>
              <CardTitle className="text-xl font-bold dark:text-white">
                Reset Password
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                Enter your email to receive a verification code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">Email</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Verification Code"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 mobile-safe-area">
      <div className="max-w-md w-full">
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold dark:text-white">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="dark:text-gray-300">
              {isSignUp ? "Sign up to get started" : "Sign in to your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Full Name</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your full name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">I want to</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={role === "user" ? "default" : "outline"}
                        onClick={() => setRole("user")}
                        className="flex items-center gap-2"
                      >
                        <User2 size={16} />
                        Book Errands
                      </Button>
                      <Button
                        type="button"
                        variant={role === "errander" ? "default" : "outline"}
                        onClick={() => setRole("errander")}
                        className="flex items-center gap-2"
                      >
                        <Users size={16} />
                        Run Errands
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">Email</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">Password</label>
                <div className="relative">
                  <input
                    className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">Confirm Password</label>
                  <div className="relative">
                    <input
                      className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>

              {!isSignUp && (
                <div className="text-center">
                  <Button 
                    type="button"
                    variant="link" 
                    className="text-sm text-gray-600 dark:text-gray-300"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot your password?
                  </Button>
                </div>
              )}

              <div className="text-center">
                <Button 
                  type="button"
                  variant="link" 
                  className="text-sm dark:text-gray-300"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" asChild className="text-sm text-gray-600 dark:text-gray-300">
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
