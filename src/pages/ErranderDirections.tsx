
import { Map, Navigation, MapPin, Clock, User } from "lucide-react";
import { useTask } from "@/contexts/TaskContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MapComponent from "@/components/Map";
import { useEffect } from "react";

export default function ErranderDirections() {
  const { erranderActiveTask, updateTaskStatus } = useTask();

  // Debug logging
  useEffect(() => {
    console.log("ErranderDirections - Current active task:", erranderActiveTask);
  }, [erranderActiveTask]);

  const handleUpdateStatus = () => {
    if (!erranderActiveTask) return;
    
    const statusFlow = {
      'assigned': 'en-route',
      'en-route': 'in-progress',
      'in-progress': 'completed'
    };
    
    const nextStatus = statusFlow[erranderActiveTask.status as keyof typeof statusFlow];
    if (nextStatus) {
      updateTaskStatus(erranderActiveTask.id, nextStatus as any);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'en-route': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'in-progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getNextAction = () => {
    if (!erranderActiveTask) return null;
    
    switch (erranderActiveTask.status) {
      case 'assigned': return { text: 'Start Journey', action: 'en-route' };
      case 'en-route': return { text: 'Arrive at Location', action: 'in-progress' };
      case 'in-progress': return { text: 'Complete Task', action: 'completed' };
      case 'completed': return null;
      default: return null;
    }
  };

  if (!erranderActiveTask) {
    return (
      <main className="max-w-lg mx-auto px-4 py-8 animate-fade-in mobile-safe-area">
        <h1 className="text-2xl font-bold mb-5 flex gap-2 items-center text-primary">
          <Map /> Directions to Task
        </h1>
        <div className="text-center py-12">
          <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Active Task</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Accept a task from the Tasks page to view live navigation and directions!
          </p>
          <Button asChild>
            <a href="/tasks">Browse Available Tasks</a>
          </Button>
        </div>
      </main>
    );
  }

  const nextAction = getNextAction();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 animate-fade-in mobile-safe-area">
      <h1 className="text-2xl font-bold mb-6 flex gap-2 items-center text-primary">
        <Map /> Task Directions & Navigation
      </h1>

      {/* Active Task Info */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{erranderActiveTask.title}</CardTitle>
            <Badge className={getStatusColor(erranderActiveTask.status)}>
              {erranderActiveTask.status.replace('-', ' ')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">{erranderActiveTask.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">From</p>
                <p className="font-medium">{erranderActiveTask.userLocation}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">To</p>
                <p className="font-medium">{erranderActiveTask.taskLocation}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-800 dark:text-emerald-200">
                ETA: {erranderActiveTask.estimatedTime || '20-30 mins'}
              </span>
            </div>
            <div className="text-emerald-700 dark:text-emerald-300 font-bold">
              KSh {erranderActiveTask.amount}
            </div>
          </div>

          {nextAction && (
            <Button 
              onClick={handleUpdateStatus}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              {nextAction.text}
            </Button>
          )}

          {erranderActiveTask.status === 'completed' && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <p className="text-green-800 dark:text-green-200 font-semibold">
                ✅ Task Completed Successfully!
              </p>
              <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                Waiting for customer payment confirmation...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Map Component */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Live Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MapComponent 
            userCoords={[-1.286389, 36.817223]}
            erranders={[]}
          />
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
            🗺️ Interactive map showing route from your location to the task destination
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
