
import { Link, useLocation } from "react-router-dom";
import { Map, Wallet } from "lucide-react";
import ToggleRoleButton from "./ToggleRoleButton";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/book", label: "Book Errand" },
  { to: "/tasks", label: "My Tasks" },
  { to: "/wallet", label: "Wallet", icon: <Wallet size={18} className="inline ml-1 mb-[2px]" /> }
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-primary shadow-sm sticky top-0 z-30">
      <Link to="/" className="flex items-center gap-2 text-primary-foreground font-bold text-xl tracking-tight hover:opacity-80">
        <Map className="w-7 h-7 animate-pulse" /> ErrandDash Go
      </Link>
      <div className="flex gap-2 items-center ml-10">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              "px-4 py-2 rounded-lg font-medium duration-150 transition-colors hover:bg-accent hover:text-accent-foreground group",
              location.pathname === link.to ? "bg-background text-primary" : "text-primary-foreground"
            )}
          >
            {link.label} {link.icon}
          </Link>
        ))}
      </div>
      <ToggleRoleButton />
    </nav>
  );
};

export default Navbar;
