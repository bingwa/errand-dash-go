
// Booking page: Dynamic forms per service with required locations & modern look
import { useState } from "react";
import Map from "@/components/Map";
import MapboxTokenPrompt from "@/components/MapboxTokenPrompt";
import { Map as MapIcon, ShoppingBag, Package, Sparkles, User2, ListTodo } from "lucide-react";

const SERVICE_CONFIG = {
  groceries: {
    icon: <ShoppingBag className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "Pick & Deliver Groceries",
    fields: [
      { key: "pickup", label: "Pickup Location", type: "text", placeholder: "e.g. Carrefour, Sarit Centre" },
      { key: "drop", label: "Delivery Location", type: "text", placeholder: "e.g. Home, Office Address" },
      { key: "notes", label: "Grocery List / Notes", type: "textarea", placeholder: "Milk, eggs, etc." }
    ]
  },
  packages: {
    icon: <Package className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "Deliver a Package",
    fields: [
      { key: "pickup", label: "Pickup Point", type: "text", placeholder: "e.g. UPS, CBD" },
      { key: "recipient", label: "Recipient Name", type: "text", placeholder: "e.g. Jane Doe" },
      { key: "drop", label: "Dropoff Location", type: "text", placeholder: "e.g. Elgon Offices" },
      { key: "notes", label: "Package Description/Instructions", type: "textarea", placeholder: "Fragile, handle with care" }
    ]
  },
  cleaning: {
    icon: <Sparkles className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "In-Home Cleaning",
    fields: [
      { key: "location", label: "Service Location", type: "text", placeholder: "e.g. Riverside Drive Apt 12" },
      { key: "rooms", label: "Rooms to Clean", type: "text", placeholder: "e.g. 2 Bedroom, 1 Living" },
      { key: "notes", label: "Additional Notes", type: "textarea", placeholder: "Leave balcony for last" }
    ]
  },
  shopping: {
    icon: <ListTodo className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "Shopping Delivery",
    fields: [
      { key: "pickup", label: "Store/Market", type: "text", placeholder: "e.g. Two Rivers Mall" },
      { key: "drop", label: "Delivery Destination", type: "text", placeholder: "e.g. Argwings Apartments" },
      { key: "items", label: "Shopping List", type: "textarea", placeholder: "Shoes, jackets, etc." }
    ]
  },
  custom: {
    icon: <User2 className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "Other Custom Task",
    fields: [
      { key: "location", label: "Task Location", type: "text", placeholder: "e.g. specific place" },
      { key: "description", label: "Task Description", type: "textarea", placeholder: "What do you need done?" }
    ]
  }
};

const MOCK_ERRANDERS = [
  { id: "1", name: "James (Groceries)", coords: [36.825, -1.287] as [number, number], avatarUrl: "" },
  { id: "2", name: "Winnie (Packages)", coords: [36.818, -1.295] as [number, number], avatarUrl: "" },
  { id: "3", name: "Alex (Cleaner)", coords: [36.832, -1.291] as [number, number], avatarUrl: "" }
];

const BookErrand = () => {
  const [service, setService] = useState<keyof typeof SERVICE_CONFIG>("groceries");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [coords, setCoords] = useState<[number, number] | undefined>(undefined);
  const [token, setToken] = useState(localStorage.getItem("mapbox_token"));
  const config = SERVICE_CONFIG[service];

  const getGeocode = async (address: string) => {
    if (!token) return;
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`);
    const data = await res.json();
    return data?.features?.[0]?.center as [number, number] | undefined;
  };

  const handleLocate = async () => {
    // Try to geocode first available location/key with a value
    const locKey = Object.keys(fields).find(k =>
      /location|pickup/i.test(k) && fields[k]
    );
    if (locKey) {
      const c = await getGeocode(fields[locKey]);
      if (c) setCoords(c);
    }
  };

  const handleField = (key: string, value: string) => {
    setFields(f => ({ ...f, [key]: value }));
  };

  if (!token)
    return <MapboxTokenPrompt onToken={(t) => setToken(t)} />;

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-8 max-w-6xl mx-auto mt-8 animate-fade-in rounded-2xl bg-gradient-to-br from-white to-muted/30 shadow-xl border">
      {/* Form */}
      <section className="flex-1 rounded-xl bg-card shadow p-8 border border-primary/10 md:min-w-[370px]">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 tracking-tight text-primary/80">
          <MapIcon className="w-8 h-8" />
          Book an Errand
        </h1>
        <div className="flex gap-2 my-3">
          {Object.entries(SERVICE_CONFIG).map(([key, svc]) =>
            <button
              aria-label={svc.label}
              key={key}
              className={`px-4 py-2 rounded-full flex items-center gap-1 font-semibold border border-transparent shadow-sm transition
                ${service === key ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-muted text-primary hover:border-primary/40 hover:bg-muted/80"}
              `}
              onClick={() => { setService(key as keyof typeof SERVICE_CONFIG); setFields({}); setCoords(undefined); }}
            >
              {svc.icon}{svc.label}
            </button>
          )}
        </div>
        <form className="flex flex-col gap-5 mt-5" onSubmit={e => { e.preventDefault(); handleLocate(); }}>
          {config.fields.map(field =>
            <div key={field.key}>
              <label className="font-bold text-sm mb-2 block">{field.label}</label>
              {field.type === "text" ? (
                <input
                  className="border px-3 py-2 rounded w-full ring-1 ring-accent/30 focus:ring-primary focus:outline-none font-semibold"
                  type="text"
                  placeholder={field.placeholder}
                  value={fields[field.key] || ""}
                  onChange={e => handleField(field.key, e.target.value)}
                  required
                />
              ) : (
                <textarea
                  className="border px-3 py-2 rounded w-full ring-1 ring-accent/30 focus:ring-primary focus:outline-none"
                  placeholder={field.placeholder}
                  rows={3}
                  value={fields[field.key] || ""}
                  onChange={e => handleField(field.key, e.target.value)}
                  required
                />
              )}
            </div>
          )}
          <button
            className="bg-primary text-primary-foreground rounded py-2 px-1 font-bold mt-3 hover:bg-primary/90 shadow-xl transition hover:scale-105"
            type="submit"
          >
            Locate & Show Available Erranders
          </button>
        </form>
      </section>
      {/* Map */}
      <aside className="flex-1 min-w-[330px]">
        <Map userCoords={coords} erranders={MOCK_ERRANDERS} />
      </aside>
    </div>
  );
};

export default BookErrand;
