
import { Link, useLocation } from "react-router-dom";
import { Map, Wallet, Users, MessageCircle, LogOut, Home as HomeIcon, ClipboardCheck, Search, Package, User2, Directions } from "lucide-react";
import ToggleRoleButton from "./ToggleRoleButton";
import { cn } from "@/lib/utils";

// Distinct sets for roles, and no icons for guest links
const userLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <HomeIcon size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/book", label: "Book Errand", icon: <ClipboardCheck size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/tracking", label: "Tracking", icon: <Search size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/wallet", label: "Wallet", icon: <Wallet size={18} className="inline ml-1 mb-[2px]" /> },
];
const erranderLinks = [
  { to: "/dashboard", label: "Dashboard", icon: <HomeIcon size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/tasks", label: "My Jobs", icon: <Package size={18} className="inline ml-1 mb-[2px]" /> },
  { to: "/directions", label: "Directions", icon: <Directions size={18} className="inline ml-1 mb-[2px]" /> },
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
    <nav className="flex items-center justify-between px-8 py-4 bg-background shadow sticky top-0 z-30 border-b border-accent/40">
      <Link to="/dashboard" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight hover:opacity-80">
        <Map className="w-7 h-7 animate-pulse" /> <span className="text-emerald-700">ErrandDash Go</span>
      </Link>
      <div className="flex gap-2 items-center ml-8">
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
      <div className="flex gap-2 items-center">
        <button
          className="text-primary bg-background/70 border border-primary/70 px-3 py-1 rounded-lg hover:bg-primary hover:text-primary-foreground flex items-center gap-2 transition-colors"
          onClick={onLogout}
        ><LogOut size={18} />Log Out</button>
        <ToggleRoleButton />
      </div>
    </nav>
  );
};

export default Navbar;
