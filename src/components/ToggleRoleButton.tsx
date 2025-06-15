
import { useState } from "react";
import { User2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const ToggleRoleButton = () => {
  const [role, setRole] = useState<"customer" | "errander">(localStorage.getItem("role") as any || "customer");
  const toggle = () => {
    const next = role === "customer" ? "errander" : "customer";
    setRole(next);
    localStorage.setItem("role", next);
    window.location.reload();
  };
  return (
    <Button
      variant="secondary"
      className="flex gap-2 items-center"
      onClick={toggle}
      title={`Switch to ${role === "customer" ? "Errander" : "Customer"} dashboard`}
    >
      {role === "customer" ? <User2 size={18} /> : <Users size={18} />}{" "}
      <span className="hidden sm:inline">{role === "customer" ? "Customer" : "Errander"}</span>
    </Button>
  );
};

export default ToggleRoleButton;
