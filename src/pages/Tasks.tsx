
import { useState, useEffect } from "react";
import JobCard, { Job } from "@/components/JobCard";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { useTask } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, RefreshCw } from "lucide-react";

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

const Tasks = () => {
  const [role] = useState((localStorage.getItem("role") as "customer" | "errander") || "customer");
  const [tabs] = useState(role === "customer" ? ["Active", "Completed"] : ["Available", "Active", "Completed"]);
  const [refreshing, setRefreshing] = useState(false);
  const { availableTasks, erranderActiveTask, acceptTask } = useTask();

  function getJobs(tab: string) {
    if (role === "customer") {
      if (tab === "Active") return MOCK_CUSTOMER_JOBS.filter(j => j.status !== "completed");
      if (tab === "Completed") return MOCK_CUSTOMER_JOBS.filter(j => j.status === "completed");
    }
    if (role === "errander") {
      if (tab === "Available") return [];
      if (tab === "Active") return erranderActiveTask ? [convertTaskToJob(erranderActiveTask)] : [];
      if (tab === "Completed") return [];
    }
    return [];
  }

  const convertTaskToJob = (task: any): Job => ({
    id: task.id,
    type: task.type,
    status: task.status,
    date: new Date(task.createdAt).toISOString().split('T')[0],
    details: task.description,
    from: task.userLocation,
    to: task.taskLocation,
    amount: task.amount
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleAcceptTask = (taskId: string) => {
    acceptTask(taskId);
    alert("Task accepted successfully! Check the Active tab to see your task.");
  };

  const handleAction = (job: Job) => {
    alert(`Action performed on job ${job.id}`);
  };

  return (
    <main className="max-w-5xl mx-auto px-2 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{role === "customer" ? "Your Tasks" : "Errander Job Board"}</h1>
        {role === "errander" && (
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>
      
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
            <Tab.Panel key={tab} className="pb-10">
              {/* Available Tasks for Erranders */}
              {role === "errander" && tab === "Available" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="w-4 h-4" />
                    Live updates • {availableTasks.length} tasks available
                  </div>
                  
                  {availableTasks.length === 0 ? (
                    <div className="p-12 text-muted-foreground text-center w-full">
                      No tasks available at the moment. Check back soon!
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {availableTasks.map((task) => (
                        <Card key={task.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg mb-1">{task.title}</CardTitle>
                                <Badge variant="outline" className="mb-2">
                                  {task.type}
                                </Badge>
                                <p className="text-sm text-muted-foreground">{task.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                  <DollarSign className="w-4 h-4" />
                                  KSh {task.amount}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">From:</span>
                                <span>{task.userLocation}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">To:</span>
                                <span>{task.taskLocation}</span>
                              </div>
                            </div>
                            <Button 
                              onClick={() => handleAcceptTask(task.id)}
                              className="w-full bg-emerald-600 hover:bg-emerald-700"
                            >
                              Accept Task
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Regular jobs for other tabs */}
              {(role === "customer" || tab !== "Available") && (
                <div className="flex flex-wrap gap-6">
                  {getJobs(tab).length === 0 && (
                    <div className="p-12 text-muted-foreground text-center w-full">
                      No jobs in this category.
                    </div>
                  )}
                  {getJobs(tab).map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      showActions={role === "errander" && (tab === "Available" || tab === "Active")}
                      onAccept={() => handleAction(job)}
                      onComplete={() => handleAction(job)}
                    />
                  ))}
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
};

export default Tasks;
