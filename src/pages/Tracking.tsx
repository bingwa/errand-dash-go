
import { useState, useEffect } from "react";
import { useTask } from "@/contexts/TaskContext";
import { Map, Users, Clock, Phone, Star, MapPin, CheckCircle2, Loader2, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const statusSteps = [
  { 
    key: "pending", 
    label: "Request Created", 
    desc: "Your errand request has been placed.", 
    icon: Package2 
  },
  { 
    key: "assigned", 
    label: "Errander Assigned", 
    desc: "An errander has accepted your task.", 
    icon: Users 
  },
  { 
    key: "en-route", 
    label: "Errander En Route", 
    desc: "Errander is on their way to the location.", 
    icon: MapPin 
  },
  { 
    key: "in-progress", 
    label: "Task In Progress", 
    desc: "Your errand is being completed.", 
    icon: Loader2 
  },
  { 
    key: "completed", 
    label: "Completed", 
    desc: "Your errand is complete.", 
    icon: CheckCircle2 
  },
];

const statusColors = {
  pending: "bg-amber-500",
  assigned: "bg-blue-500", 
  "en-route": "bg-purple-500",
  "in-progress": "bg-emerald-500",
  completed: "bg-green-600"
};

export default function Tracking() {
  const { activeTask, tasks } = useTask();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!activeTask && tasks.length === 0) {
    return (
      <main className="max-w-md mx-auto px-5 py-8 animate-fade-in">
        <div className="text-center py-12">
          <Package2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Active Tasks</h2>
          <p className="text-muted-foreground mb-6">You don't have any errands to track right now.</p>
          <Link to="/book">
            <Button className="w-full">Book Your First Errand</Button>
          </Link>
        </div>
      </main>
    );
  }

  const currentStep = statusSteps.findIndex(step => step.key === activeTask?.status) ?? 0;

  return (
    <main className="max-w-lg mx-auto px-4 py-6 animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Map className="w-6 h-6" /> Track Your Errand
        </h1>
        <p className="text-muted-foreground text-sm">Real-time updates on your task</p>
      </div>

      {activeTask && (
        <>
          {/* Task Info Card */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{activeTask.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{activeTask.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  KSh {activeTask.amount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">From:</span> {activeTask.userLocation}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">To:</span> {activeTask.taskLocation}
              </div>
              {activeTask.estimatedTime && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">ETA:</span> {activeTask.estimatedTime}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Errander Info */}
          {activeTask.assignedErrander && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Your Errander</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                      {activeTask.assignedErrander.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{activeTask.assignedErrander.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {activeTask.assignedErrander.rating}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress Steps */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative">
                {statusSteps.map((step, idx) => {
                  const isActive = idx === currentStep;
                  const isCompleted = idx < currentStep;
                  const isPending = idx > currentStep;
                  const StepIcon = step.icon;
                  
                  return (
                    <div key={step.key} className={`flex items-start gap-4 pb-6 ${idx === statusSteps.length - 1 ? 'pb-0' : ''}`}>
                      {/* Connector Line */}
                      {idx < statusSteps.length - 1 && (
                        <div className={`absolute left-5 top-10 w-0.5 h-6 ${
                          isCompleted ? 'bg-primary' : 'bg-muted'
                        }`} style={{ top: `${40 + idx * 80}px` }} />
                      )}
                      
                      {/* Step Icon */}
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        isCompleted 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : isActive 
                          ? `${statusColors[activeTask.status]} border-transparent text-white`
                          : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                      }`}>
                        {isActive && step.key === 'in-progress' ? (
                          <StepIcon className="w-5 h-5 animate-spin" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>
                      
                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                        {isActive && (
                          <p className="text-xs text-primary mt-1 font-medium">
                            {currentTime.toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order ID */}
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              Task ID: <span className="font-semibold text-primary">{activeTask.id}</span>
            </p>
          </div>
        </>
      )}

      {/* Recent Tasks */}
      {tasks.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {tasks.slice(1, 4).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.taskLocation}</p>
                </div>
                <Badge variant={task.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                  {task.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
