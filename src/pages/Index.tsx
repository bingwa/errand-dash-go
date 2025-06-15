
import { useState } from "react";
import { Map, Wallet, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [role] = useState((localStorage.getItem("role") as "customer" | "errander") || "customer");
  return (
    <main className="pt-6 max-w-6xl mx-auto px-3">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 animate-fade-in">
        <div>
          <div className="uppercase tracking-widest text-xs mb-2 text-muted-foreground">Welcome</div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-primary">
            {role === "customer"
              ? <>Book local errands – quick, safe, reliable.</>
              : <>Your Errander Dashboard</>}
          </h1>
          <div className="text-muted-foreground max-w-xl">
            {role === "customer"
              ? "Need groceries, a delivery, cleaning, or something else? Erranders are ready to help across your city. Book in seconds, track real-time, and pay all-in-one place."
              : "See available jobs, accept requests, view your tasks and wallet – all from your dashboard."}
          </div>
        </div>
        <div className="flex gap-3">
          {role === "customer" ? (
            <>
              <Link to="/book" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold hover-scale transition text-base flex gap-2 items-center shadow"><Map className="w-5 h-5" />Book an Errand</Link>
              <Link to="/tasks" className="bg-muted text-primary px-5 py-2 rounded-lg font-medium text-base flex gap-2 items-center hover:bg-primary/10 transition shadow"><Users className="w-5 h-5" />My Tasks</Link>
            </>
          ) : (
            <>
              <Link to="/tasks" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold hover-scale transition text-base flex gap-2 items-center shadow"><Users className="w-5 h-5" />Job Board</Link>
              <Link to="/wallet" className="bg-muted text-primary px-5 py-2 rounded-lg font-medium text-base flex gap-2 items-center hover:bg-primary/10 transition shadow"><Wallet className="w-5 h-5" />Wallet</Link>
            </>
          )}
        </div>
      </header>
      {/* Dashboard Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-background border shadow rounded-xl p-7 flex flex-col items-center animate-fade-in">
          <Map className="w-8 h-8 text-primary mb-2" />
          <div className="font-bold text-lg mb-1">
            {role === "customer" ? "Erranders near you" : "Available Jobs"}
          </div>
          <div className="text-xs text-muted-foreground text-center">Live mapping and available erranders/jobs update in real time.</div>
        </div>
        {/* Card 2 */}
        <div className="bg-background border shadow rounded-xl p-7 flex flex-col items-center animate-fade-in">
          <Users className="w-8 h-8 text-primary mb-2" />
          <div className="font-bold text-lg mb-1">
            {role === "customer" ? "Your Active Tasks" : "Your Active Jobs"}
          </div>
          <div className="text-xs text-muted-foreground text-center">All your ongoing errands and statuses, easily managed here.</div>
        </div>
        {/* Card 3 */}
        <div className="bg-background border shadow rounded-xl p-7 flex flex-col items-center animate-fade-in">
          <Wallet className="w-8 h-8 text-primary mb-2" />
          <div className="font-bold text-lg mb-1">Wallet</div>
          <div className="text-xs text-muted-foreground text-center">Track your earnings, payouts, and wallet history.</div>
        </div>
      </section>
    </main>
  );
}
