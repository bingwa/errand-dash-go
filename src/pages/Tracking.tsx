
import { useState } from "react";
import { Map, Users } from "lucide-react";

const steps = [
  { label: "Request created", desc: "Your errand request has been placed.", done: true },
  { label: "Errander assigned", desc: "An errander has accepted your task.", done: true },
  { label: "Errander en route", desc: "Errander is on their way.", done: false },
  { label: "Errand in progress", desc: "Task is ongoing.", done: false },
  { label: "Completed", desc: "Your errand is complete.", done: false },
];

export default function Tracking() {
  const [current] = useState(2); // Step index for demo (change to progress)

  return (
    <main className="max-w-md mx-auto px-5 py-8 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Map /> Track Your Request
      </h1>
      <ol className="relative border-l-4 border-primary pl-6 mb-7">
        {steps.map((s, idx) => (
          <li key={s.label} className={`mb-9 last:mb-0`}>
            <div className={`absolute -left-4 w-7 h-7 rounded-full flex items-center justify-center
              ${idx <= current ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border"}
            `}>
              {idx <= current ? <Users /> : <span className="font-bold text-lg">•</span>}
            </div>
            <div className={`pl-5 relative`}>
              <div className={`font-semibold ${idx <= current ? "text-primary" : "text-muted-foreground"}`}>
                {s.label}
              </div>
              <div className="text-xs">{s.desc}</div>
            </div>
          </li>
        ))}
      </ol>
      <div className="bg-muted p-3 rounded text-xs text-center text-muted-foreground">
        Order ID: <span className="font-semibold text-primary">ORD-008392</span>
      </div>
    </main>
  );
}
