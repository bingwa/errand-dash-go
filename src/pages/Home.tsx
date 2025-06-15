
import { useState } from "react";
import { User2, Users, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import userAvatars from "@/data/userAvatars";
import erranderAvatars from "@/data/erranderAvatars";

const roles = [
  { key: "user", label: "User", icon: <User2 className="mr-1" /> },
  { key: "errander", label: "Errander", icon: <Users className="mr-1" /> }
];

export default function Home({ onSignIn }) {
  const [step, setStep] = useState<"pick" | "login" | "register" | "signedin">("pick");
  const [role, setRole] = useState<"user" | "errander" | "">("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleAuth() {
    // In real app: authenticate with Supabase/api
    if (name) {
      onSignIn({ role, name });
      setStep("signedin");
    }
  }

  return (
    <main className="flex flex-col min-h-[80vh] items-center justify-center px-4 bg-gradient-to-br from-background via-[#1e293b] to-primary animate-fade-in">
      <div className="max-w-md w-full bg-background/90 shadow-xl rounded-lg p-8 border backdrop-blur animate-scale-in">
        <h1 className="text-2xl font-black tracking-tight text-center mb-2">
          Welcome to ErrandDash Go
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          Book errands, deliver, chat, and track—Uber vibes, reimagined.
        </p>

        {step === "pick" && (
          <>
            <p className="mb-4 font-semibold text-center">Are you a:</p>
            <div className="flex gap-5 justify-center mb-6">
              {roles.map(r => (
                <Button
                  variant={role === r.key ? "default" : "secondary"}
                  className="flex-1 flex gap-2 items-center py-6 text-lg font-bold"
                  key={r.key}
                  onClick={() => { setRole(r.key as any); setStep("login"); }}
                >
                  {r.icon}
                  {r.label}
                </Button>
              ))}
            </div>
          </>
        )}

        {step === "login" && (
          <>
            <h2 className="text-xl font-semibold text-center mb-3">Sign in as {role === "user" ? "User" : "Errander"}</h2>
            <input
              className="border rounded w-full px-3 py-2 mb-3"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
            <input
              className="border rounded w-full px-3 py-2 mb-3"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button className="w-full mb-2" onClick={handleAuth}><LogIn className="mr-1" />Sign In</Button>
            <Button variant="link" className="w-full mb-2" onClick={() => setStep("register")}>Don't have an account? Sign Up</Button>
            <Button variant="ghost" className="w-full" onClick={() => setStep("pick")}>Back</Button>
          </>
        )}

        {step === "register" && (
          <>
            <h2 className="text-xl font-semibold text-center mb-3">Sign up as {role === "user" ? "User" : "Errander"}</h2>
            <input
              className="border rounded w-full px-3 py-2 mb-3"
              placeholder="Pick a Name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
            />
            <input
              className="border rounded w-full px-3 py-2 mb-3"
              placeholder="Create Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button className="w-full mb-2" onClick={handleAuth}><LogIn className="mr-1" />Sign Up</Button>
            <Button variant="link" className="w-full mb-2" onClick={() => setStep("login")}>Already have an account? Sign In</Button>
            <Button variant="ghost" className="w-full" onClick={() => setStep("pick")}>Back</Button>
          </>
        )}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-12">
        <div>
          <span className="block mb-1 text-muted-foreground text-xs">Featured Users</span>
          <div className="flex gap-2">
            {userAvatars.slice(0,3).map(u => (
              <img key={u.name} src={u.avatarUrl} className="w-12 h-12 rounded-full ring-2 ring-primary" alt={u.name} title={u.name} />
            ))}
          </div>
        </div>
        <div>
          <span className="block mb-1 text-muted-foreground text-xs">Popular Erranders</span>
          <div className="flex gap-2">
            {erranderAvatars.slice(0,3).map(e => (
              <img key={e.name} src={e.avatarUrl} className="w-12 h-12 rounded-full ring-2 ring-secondary" alt={e.name} title={e.name} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
