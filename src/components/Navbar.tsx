
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, Settings, Wallet, LogOut, MapPin, Package } from "lucide-react";

export default function Navbar() {
  const { user, userProfile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-3">
                {/* Role-specific navigation */}
                {userProfile?.role === "errander" && (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link to="/tasks">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Package className="w-4 h-4" />
                        Tasks
                      </Button>
                    </Link>
                    <Link to="/directions">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MapPin className="w-4 h-4" />
                        Directions
                      </Button>
                    </Link>
                    <Link to="/wallet">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Wallet className="w-4 h-4" />
                        Wallet
                      </Button>
                    </Link>
                  </div>
                )}

                {userProfile?.role === "user" && (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link to="/book">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Package className="w-4 h-4" />
                        Book Errand
                      </Button>
                    </Link>
                    <Link to="/tracking">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <MapPin className="w-4 h-4" />
                        Track
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Profile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={userProfile?.full_name || "User"} />
                        <AvatarFallback>
                          {userProfile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{userProfile?.full_name || "User"}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="gap-2">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    {userProfile?.role === "errander" && (
                      <DropdownMenuItem asChild>
                        <Link to="/wallet" className="gap-2">
                          <Wallet className="w-4 h-4" />
                          Wallet
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
