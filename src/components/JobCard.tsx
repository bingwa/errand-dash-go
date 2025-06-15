
import { cn } from "@/lib/utils";

export interface Job {
  id: string;
  type: string;
  status: "pending" | "accepted" | "completed";
  date: string;
  details: string;
  from: string;
  to: string;
  amount: number;
}

const typeColor: Record<string, string> = {
  groceries: "bg-green-100 text-green-700",
  packages: "bg-blue-100 text-blue-700",
  cleaning: "bg-yellow-100 text-yellow-700",
  custom: "bg-gray-100 text-gray-700",
  shopping: "bg-fuchsia-100 text-fuchsia-700"
};

const statusColor: Record<string, string> = {
  pending: "bg-muted text-primary",
  accepted: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700"
};

const JobCard = ({ job, showActions, onAccept, onComplete }: {
  job: Job;
  showActions?: boolean;
  onAccept?: () => void;
  onComplete?: () => void;
}) => (
  <div className="rounded-xl border shadow bg-card p-5 flex flex-col gap-2 min-w-[235px] animate-fade-in">
    <div className="flex justify-between items-center">
      <span className={cn("text-xs px-2 py-0.5 rounded-lg", typeColor[job.type] || "bg-gray-100 text-gray-800")}>
        {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
      </span>
      <span className={cn("text-xs px-2 py-0.5 rounded-lg", statusColor[job.status])}>{job.status}</span>
    </div>
    <div className="text-sm font-medium mt-2 mb-1">
      {job.details}
    </div>
    <div className="text-xs text-muted-foreground mb-1">
      Date: {job.date}
    </div>
    <div className="flex justify-between text-xs">
      <span>From: <span className="font-semibold">{job.from}</span></span>
      <span>To: <span className="font-semibold">{job.to}</span></span>
    </div>
    <div className="font-bold text-primary text-lg mt-1 mb-3">Ksh {job.amount}</div>
    {showActions && (
      <div className="flex gap-2 mt-auto">
        {job.status === "pending" && onAccept && (
          <button className="bg-accent px-3 py-1 rounded hover-scale transition" onClick={onAccept}>
            Accept
          </button>
        )}
        {job.status === "accepted" && onComplete && (
          <button className="bg-green-500 text-white px-3 py-1 rounded hover-scale" onClick={onComplete}>
            Complete
          </button>
        )}
      </div>
    )}
  </div>
);

export default JobCard;
