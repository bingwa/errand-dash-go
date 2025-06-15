
import { useState } from "react";
import JobCard, { Job } from "@/components/JobCard";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";

const MOCK_CUSTOMER_JOBS: Job[] = [
  {
    id: "c1",
    type: "groceries",
    status: "pending",
    date: "2025-06-14",
    details: "Pick groceries at Westgate, deliver to Elgon Road",
    from: "Westgate",
    to: "Elgon Rd",
    amount: 600
  },
  {
    id: "c2",
    type: "cleaning",
    status: "accepted",
    date: "2025-06-13",
    details: "Cleaning 2BR at Riverside",
    from: "Riverside",
    to: "House 2B",
    amount: 1000
  },
  {
    id: "c3",
    type: "packages",
    status: "completed",
    date: "2025-06-12",
    details: "Deliver docs to APS offices",
    from: "CBD",
    to: "APS Offices",
    amount: 200
  }
];

const MOCK_ERRANDER_JOBS: Job[] = [
  {
    id: "e1",
    type: "groceries",
    status: "pending",
    date: "2025-06-14",
    details: "Pick groceries at Sarit, deliver to Riverside",
    from: "Sarit",
    to: "Riverside",
    amount: 550
  },
  {
    id: "e2",
    type: "shopping",
    status: "accepted",
    date: "2025-06-12",
    details: "Buy suit at TRM, Deliver to Sifa",
    from: "TRM",
    to: "Sifa Flats",
    amount: 800
  },
  {
    id: "e3",
    type: "packages",
    status: "completed",
    date: "2025-06-11",
    details: "Deliver phone to Parklands",
    from: "CBD",
    to: "Parklands",
    amount: 250
  }
];

const Tasks = () => {
  const [role] = useState((localStorage.getItem("role") as "customer" | "errander") || "customer");
  const [tabs] = useState(role === "customer" ? ["Active", "Completed"] : ["Available", "Active", "Completed"]);

  function getJobs(tab: string) {
    if (role === "customer") {
      if (tab === "Active") return MOCK_CUSTOMER_JOBS.filter(j => j.status !== "completed");
      if (tab === "Completed") return MOCK_CUSTOMER_JOBS.filter(j => j.status === "completed");
    }
    if (role === "errander") {
      if (tab === "Available") return MOCK_ERRANDER_JOBS.filter(j => j.status === "pending");
      if (tab === "Active") return MOCK_ERRANDER_JOBS.filter(j => j.status === "accepted");
      if (tab === "Completed") return MOCK_ERRANDER_JOBS.filter(j => j.status === "completed");
    }
    return [];
  }

  const handleAction = (job: Job) => {
    // In a real app, update job with API.
    alert(`Action performed on job ${job.id}`);
  };

  return (
    <main className="max-w-5xl mx-auto px-2 pt-10">
      <h1 className="text-2xl font-bold mb-6">{role === "customer" ? "Your Tasks" : "Errander Job Board"}</h1>
      <Tab.Group>
        <Tab.List className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <Tab
              key={tab}
              className={({ selected }) =>
                cn(
                  "px-5 py-2 rounded-t-md font-medium transition",
                  selected
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted hover:bg-accent/80 text-muted-foreground"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map(tab => (
            <Tab.Panel key={tab} className="flex flex-wrap gap-6 pb-10">
              {getJobs(tab).length === 0 && <div className="p-12 text-muted-foreground text-center w-full">No jobs in this category.</div>}
              {getJobs(tab).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  showActions={role === "errander" && (tab === "Available" || tab === "Active")}
                  onAccept={() => handleAction(job)}
                  onComplete={() => handleAction(job)}
                />
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

export default Tasks;
