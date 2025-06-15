
import { Link, useLocation } from "react-router-dom";
import { Map, Wallet, LogOut, Home as HomeIcon, ClipboardCheck, Search, Package, Navigation, User, Settings, ChevronDown } from "lucide-react";
import ToggleRoleButton from "./ToggleRoleButton";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Distinct sets for roles, and no icons for guest links
const userLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <HomeIcon size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/book", label: "Book Errand", icon: <ClipboardCheck size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/tracking", label: "Tracking", icon: <Search size={18} className="inline ml-1 mb-[2px]" /> },
];
const erranderLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <HomeIcon size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/tasks", label: "My Jobs", icon: <Package size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/directions", label: "Directions", icon: <Navigation size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/wallet", label: "Wallet", icon: <Wallet size={18} className="inline ml-1 mb-[2px]" /> },
];

function getLinks(role: "errander" | "user", signedIn: boolean) {
  if (!signedIn) return []; // No nav for not signed in
  if (role === "errander") return erranderLinks;
  return userLinks;
}

const Navbar = ({ signedIn, role, onLogout }) => {
  const location = useLocation();
  if (!signedIn) return null; // Hide navbar if not logged in

  const links = getLinks(role, signedIn);
  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-3 bg-background/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-accent/40 mobile-safe-area">
      <Link to="/dashboard" className="flex items-center gap-2 text-primary font-bold text-lg sm:text-xl tracking-tight hover:opacity-80 transition-opacity">
        <Map className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" /> 
        <span className="text-emerald-700 font-poppins">ErrandDash</span>
      </Link>
      
      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:flex gap-2 items-center ml-8">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "px-4 py-2 rounded-lg font-medium duration-150 transition-colors hover:bg-muted hover:text-primary group flex items-center gap-1",
              location.pathname === link.to ? "bg-primary text-primary-foreground shadow" : "text-primary"
            )}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </div>

      {/* Profile Dropdown */}
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        
        <div className="hidden sm:block">
          <ToggleRoleButton />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {role === "user" ? "U" : "E"}
              </AvatarFallback>
            </Avatar>
            <ChevronDown size={16} className="text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md border border-border/50">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center gap-2">
                <User size={16} />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings size={16} />
                Settings
              </Link>
            </DropdownMenuItem>
            {role === "errander" && (
              <DropdownMenuItem asChild>
                <Link to="/wallet" className="flex items-center gap-2">
                  <Wallet size={16} />
                  Wallet
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onLogout}
              className="flex items-center gap-2 text-destructive focus:text-destructive"
            >
              <LogOut size={16} />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
