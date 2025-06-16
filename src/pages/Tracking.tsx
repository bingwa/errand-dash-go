
import { useState, useEffect } from "react";
import { useTask } from "@/contexts/TaskContext";
import { MapPin, Clock, User, Phone, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CheckoutModal from "@/components/CheckoutModal";

export default function Tracking() {
  const { tasks, activeTask, updateTaskStatus } = useTask();
  const [selectedTask, setSelectedTask] = useState(activeTask);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    if (activeTask && activeTask.status === 'checkout') {
      setShowCheckout(true);
    }
  }, [activeTask]);

  const handlePaymentComplete = () => {
    if (selectedTask) {
      updateTaskStatus(selectedTask.id, 'completed');
      setShowCheckout(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'assigned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'en-route': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'in-progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'checkout': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'checkout':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (!selectedTask) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Active Tasks</h2>
          <p className="text-gray-600 dark:text-gray-400">You don't have any active tasks to track right now.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Task Tracking</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor your task progress in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Task Details */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xl text-gray-900 dark:text-white">{selectedTask.title}</span>
              <Badge className={getStatusColor(selectedTask.status)}>
                {getStatusIcon(selectedTask.status)}
                <span className="ml-1">{selectedTask.status.replace('-', ' ')}</span>
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Description</h4>
              <p className="text-gray-600 dark:text-gray-400">{selectedTask.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  From
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedTask.userLocation}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  To
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedTask.taskLocation}</p>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-1">Task Amount</h4>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">KSh {selectedTask.amount}</p>
            </div>

            {selectedTask.status === 'checkout' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">✅ Task Completed!</h4>
                <p className="text-blue-700 dark:text-blue-300 mb-3">
                  Your errander has completed the task. Please proceed to payment.
                </p>
                <Button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Proceed to Payment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Errander Info */}
        {selectedTask.assignedErrander && (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">Your Errander</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {selectedTask.assignedErrander.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{selectedTask.assignedErrander.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-gray-600 dark:text-gray-400">{selectedTask.assignedErrander.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{selectedTask.assignedErrander.phone}</span>
                </div>
                {selectedTask.estimatedTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400">ETA: {selectedTask.estimatedTime}</span>
                  </div>
                )}
              </div>

              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call Errander
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Progress Timeline */}
      <Card className="mt-8 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 dark:text-white">Progress Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { status: 'pending', label: 'Task Created', completed: true },
              { status: 'assigned', label: 'Errander Assigned', completed: ['assigned', 'en-route', 'in-progress', 'completed', 'checkout'].includes(selectedTask.status) },
              { status: 'en-route', label: 'Errander En Route', completed: ['en-route', 'in-progress', 'completed', 'checkout'].includes(selectedTask.status) },
              { status: 'in-progress', label: 'Task In Progress', completed: ['in-progress', 'completed', 'checkout'].includes(selectedTask.status) },
              { status: 'completed', label: 'Task Completed', completed: ['completed', 'checkout'].includes(selectedTask.status) },
              { status: 'checkout', label: 'Payment & Checkout', completed: selectedTask.status === 'checkout' }
            ].map((step, index) => (
              <div key={step.status} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`font-medium ${
                  step.completed 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        amount={selectedTask.amount}
        taskTitle={selectedTask.title}
        onPaymentComplete={handlePaymentComplete}
      />
    </main>
  );
}
