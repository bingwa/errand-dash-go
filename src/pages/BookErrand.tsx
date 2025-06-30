import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "@/contexts/TaskContext";
import Map from "@/components/Map";
import { Map as MapIcon, ShoppingBag, Package, Sparkles, User2, ListTodo, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Securely access the Mapbox token from environment variables
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

const SERVICE_CONFIG = {
  groceries: {
    icon: <ShoppingBag className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "Pick & Deliver Groceries",
    fields: [
      { key: "userLocation", label: "Your Current Location", type: "text", placeholder: "e.g. Home, Kileleshwa" },
      { key: "pickup", label: "Store/Pickup Location", type: "text", placeholder: "e.g. Carrefour, Sarit Centre" },
      { key: "drop", label: "Delivery Location", type: "text", placeholder: "e.g. Home, Office Address" },
      { key: "notes", label: "Grocery List / Notes", type: "textarea", placeholder: "Milk, eggs, etc." }
    ]
  },
  packages: {
    icon: <Package className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "Deliver a Package",
    fields: [
      { key: "userLocation", label: "Your Current Location", type: "text", placeholder: "e.g. Office, Ngong Road" },
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
      { key: "userLocation", label: "Your Current Location", type: "text", placeholder: "e.g. Office or Apartment" },
      { key: "location", label: "Service (Task) Location", type: "text", placeholder: "e.g. Riverside Drive Apt 12" },
      { key: "rooms", label: "Rooms to Clean", type: "text", placeholder: "e.g. 2 Bedroom, 1 Living" },
      { key: "notes", label: "Additional Notes", type: "textarea", placeholder: "Leave balcony for last" }
    ]
  },
  shopping: {
    icon: <ListTodo className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "Shopping Delivery",
    fields: [
      { key: "userLocation", label: "Your Current Location", type: "text", placeholder: "e.g. Home" },
      { key: "pickup", label: "Store/Market", type: "text", placeholder: "e.g. Two Rivers Mall" },
      { key: "drop", label: "Delivery Destination", type: "text", placeholder: "e.g. Argwings Apartments" },
      { key: "items", label: "Shopping List", type: "textarea", placeholder: "Shoes, jackets, etc." }
    ]
  },
  custom: {
    icon: <User2 className="w-6 h-6 mr-1 inline text-primary"/>,
    label: "Other Custom Task",
    fields: [
      { key: "userLocation", label: "Your Current Location", type: "text", placeholder: "e.g. CBD, Home" },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createTask } = useTask();
  const navigate = useNavigate();
  const config = SERVICE_CONFIG[service];

  const getGeocode = async (address: string) => {
    if (!mapboxToken) {
      toast.error("Map service is not available. Please contact administrator.");
      console.error("Mapbox token is not configured. Set VITE_MAPBOX_TOKEN in .env file.");
      return;
    }
    
    try {
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}`);
      const data = await res.json();
      const center = data?.features?.[0]?.center as [number, number] | undefined;
      if (!center) {
        toast.error(`Could not find location: ${address}`);
      }
      return center;
    } catch (error) {
      console.error("Geocoding error:", error);
      toast.error("An error occurred while finding the location.");
      return;
    }
  };

  const handleLocate = async () => {
    const locKey = Object.keys(fields).find(k =>
      /location|pickup/i.test(k) && fields[k]
    );
    if (locKey && fields[locKey]) {
      const c = await getGeocode(fields[locKey]);
      if (c) setCoords(c);
    } else {
        toast.info("Please enter a pickup or task location to find nearby errand runners.");
    }
  };

  const handleField = (key: string, value: string) => {
    setFields(f => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requiredFields = config.fields.filter(f => !f.type.includes('textarea')); // A simple way to treat textareas as optional
      const missingFields = requiredFields.filter(f => !fields[f.key]?.trim());
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in: ${missingFields.map(f => f.label).join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      const taskData = {
        type: service,
        title: config.label,
        description: fields.notes || fields.description || fields.items || `${config.label} task`,
        userLocation: fields.userLocation,
        taskLocation: fields.pickup || fields.location,
        amount: Math.floor(Math.random() * 800) + 200, 
      };

      createTask(taskData);
      toast.success('Task created! Redirecting to tracking...');
      
      setTimeout(() => {
        navigate('/tracking');
      }, 1500);

    } catch (error) {
      toast.error('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 p-8 max-w-6xl mx-auto mt-8 animate-fade-in rounded-2xl bg-gradient-to-br from-white to-muted/30 shadow-xl border">
      <section className="flex-1 rounded-xl bg-card shadow p-8 border border-primary/10 md:min-w-[370px]">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 tracking-tight text-primary/80">
          <MapIcon className="w-8 h-8" />
          Book an Errand
        </h1>
        <div className="flex gap-2 my-3 flex-wrap">
          {Object.entries(SERVICE_CONFIG).map(([key, svc]) =>
            <button
              aria-label={svc.label}
              key={key}
              className={`px-3 py-2 rounded-full flex items-center gap-1 font-semibold border border-transparent shadow-sm transition text-sm ${service === key ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-muted text-primary hover:border-primary/40 hover:bg-muted/80"}`}
              onClick={() => { setService(key as keyof typeof SERVICE_CONFIG); setFields({}); setCoords(undefined); }}
            >
              {svc.icon}{svc.label}
            </button>
          )}
        </div>
        <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit}>
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
                  required={!field.type.includes('textarea')}
                />
              ) : (
                <textarea
                  className="border px-3 py-2 rounded w-full ring-1 ring-accent/30 focus:ring-primary focus:outline-none"
                  placeholder={field.placeholder}
                  rows={3}
                  value={fields[field.key] || ""}
                  onChange={e => handleField(field.key, e.target.value)}
                />
              )}
            </div>
          )}
          <button
            className="bg-primary text-primary-foreground rounded py-2 px-1 font-bold mt-3 hover:bg-primary/90 shadow-xl transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={handleLocate}
            disabled={isSubmitting || !mapboxToken}
          >
            Locate & Show Available Erranders
          </button>
          
          <button
            className="bg-emerald-600 text-white rounded py-3 px-4 font-bold mt-2 hover:bg-emerald-700 shadow-xl transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Task..." : "Book This Errand"}
          </button>
        </form>
      </section>
      <aside className="flex-1 min-w-[330px]">
        <Map mapboxToken={mapboxToken} userCoords={coords} erranders={MOCK_ERRANDERS} />
      </aside>
    </div>
  );
};

export default BookErrand;
