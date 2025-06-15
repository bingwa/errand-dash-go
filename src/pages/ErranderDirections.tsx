
import { Map } from "lucide-react";
import MapComponent from "@/components/Map";

export default function ErranderDirections() {
  // In real implementation, show map directions from errander's location to task location!
  return (
    <main className="max-w-lg mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl font-bold mb-5 flex gap-2 items-center text-primary">
        <Map /> Directions to Task
      </h1>
      <div className="mb-5 text-muted-foreground">
        Accept a task to view live navigation!
      </div>
      <MapComponent />
    </main>
  );
}
