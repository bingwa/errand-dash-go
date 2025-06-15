
import { Link } from "react-router-dom";
import { MessageSquare, Users, Map } from "lucide-react";
// Placeholder: import profiles, jobs, etc
export default function ErranderDashboard() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2 text-primary tracking-tight">🧑‍🦱 Errander Dashboard</h1>
      <p className="mb-8 text-muted-foreground text-base max-w-xl">
        View available jobs, chat with users, track your earnings, and manage requests.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <Link to="/tasks" className="bg-primary rounded-lg text-primary-foreground p-8 font-semibold shadow hover-scale flex flex-col items-center">
          <Users className="w-8 h-8 mb-2" />
          Available Jobs
        </Link>
        <Link to="/chat" className="bg-muted text-primary rounded-lg p-8 font-semibold shadow hover-scale flex flex-col items-center">
          <MessageSquare className="w-8 h-8 mb-2" />
          Chat with Users
        </Link>
        <Link to="/tracking" className="bg-secondary text-secondary-foreground rounded-lg p-8 font-semibold shadow hover-scale flex flex-col items-center">
          <Map className="w-8 h-8 mb-2" />
          Track Jobs
        </Link>
      </div>
    </main>
  );
}
