
import { Link } from "react-router-dom";
import { MessageCircle, Map, Users } from "lucide-react";
// Placeholder: import profiles, tasks, etc
export default function UserDashboard() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2 text-primary tracking-tight">👋 Welcome, User!</h1>
      <p className="mb-8 text-muted-foreground text-base max-w-xl">
        Book errands, track status, chat with erranders, and manage your requests.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <Link to="/book" className="bg-primary rounded-lg text-primary-foreground p-8 font-semibold shadow hover-scale flex flex-col items-center">
          <Map className="w-8 h-8 mb-2" />
          Book an Errand
        </Link>
        <Link to="/chat" className="bg-muted text-primary rounded-lg p-8 font-semibold shadow hover-scale flex flex-col items-center">
          <MessageCircle className="w-8 h-8 mb-2" />
          Chat with Erranders
        </Link>
        <Link to="/tracking" className="bg-secondary text-secondary-foreground rounded-lg p-8 font-semibold shadow hover-scale flex flex-col items-center">
          <Users className="w-8 h-8 mb-2" />
          Track your Tasks
        </Link>
      </div>
    </main>
  );
}
