
import { useState } from "react";
import Map from "@/components/Map";
import MapboxTokenPrompt from "@/components/MapboxTokenPrompt";
import { Map as MapIcon } from "lucide-react";

const MOCK_ERRANDERS = [
  { id: "1", name: "James (Groceries)", coords: [36.825, -1.287] as [number, number], avatarUrl: "" },
  { id: "2", name: "Winnie (Packages)", coords: [36.818, -1.295] as [number, number], avatarUrl: "" },
  { id: "3", name: "Alex (Cleaner)", coords: [36.832, -1.291] as [number, number], avatarUrl: "" }
];

const BookErrand = () => {
  const [coords, setCoords] = useState<[number, number] | undefined>(undefined);
  const [token, setToken] = useState(localStorage.getItem("mapbox_token"));
  const [form, setForm] = useState({ location: "", type: "groceries", notes: "" });

  const getGeocode = async (address: string) => {
    if (!token) return;
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`);
    const data = await res.json();
    return data?.features?.[0]?.center as [number, number] | undefined;
  };

  const handleLocate = async () => {
    if (form.location) {
      const c = await getGeocode(form.location);
      if (c) setCoords(c);
    }
  };

  if (!token)
    return <MapboxTokenPrompt onToken={(t) => setToken(t)} />;

  return (
    <div className="flex gap-8 p-8 max-w-6xl mx-auto mt-8 items-start animate-fade-in">
      {/* Form */}
      <section className="flex-1 bg-background rounded-lg shadow-md p-8 border">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-1">
          <MapIcon className="w-6 h-6" />
          Book an Errand
        </h1>
        <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleLocate(); }}>
          <div>
            <label className="font-semibold mb-1 block">Pickup/Task Location</label>
            <input
              className="border px-3 py-2 rounded w-full"
              type="text"
              placeholder="e.g. Sarit, Nairobi"
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            />
          </div>
          <div>
            <label className="font-semibold mb-1 block">Type of Errand</label>
            <select
              className="border px-3 py-2 rounded w-full"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            >
              <option value="groceries">Pick & Deliver Groceries</option>
              <option value="packages">Deliver a Package</option>
              <option value="cleaning">In-Home Cleaning</option>
              <option value="shopping">Shopping Delivery</option>
              <option value="custom">Other Custom Task</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mb-1 block">Notes for Errander</label>
            <textarea
              className="border px-3 py-2 rounded w-full"
              placeholder="Details e.g. preferred store, delivery instructions"
              rows={3}
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />
          </div>
          <button
            className="bg-primary text-primary-foreground rounded py-2 font-medium mt-3 hover:bg-primary/90 transition hover-scale"
            type="submit"
          >
            Locate & Show Available Erranders
          </button>
        </form>
      </section>
      {/* Map */}
      <aside className="flex-1 min-w-[300px]">
        <Map userCoords={coords} erranders={MOCK_ERRANDERS} />
      </aside>
    </div>
  );
};

export default BookErrand;

