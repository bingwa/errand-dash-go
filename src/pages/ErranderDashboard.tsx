
import { useTask } from "@/contexts/TaskContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Bell, CheckCircle, Navigation, Star, TrendingUp, Users, Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function ErranderDashboard() {
  const { availableTasks, erranderActiveTask, acceptTask, newTaskNotification, clearNewTaskNotification } = useTask();

  const handleAcceptTask = (taskId: string) => {
    acceptTask(taskId);
    alert("Task accepted successfully! Check your active task below or navigate to Directions.");
  };

  const stats = {
    totalEarnings: 15750,
    completedTasks: 24,
    rating: 4.8,
    activeClients: 12
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-900/20 mobile-safe-area">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
            Welcome Back, Errander! 🚀
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Ready to earn? Check out available tasks and start making money today.
          </p>
        </div>

        {/* Live Notification */}
        {newTaskNotification && (
          <Card className="mb-8 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/20 animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-blue-800 dark:text-blue-200">New Task Available!</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => clearNewTaskNotification()}
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  Dismiss
                </Button>
              </div>
              <div className="mt-2">
                <p className="font-medium text-blue-900 dark:text-blue-100">{newTaskNotification.title}</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">{newTaskNotification.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <MapPin className="w-3 h-3" />
                    {newTaskNotification.taskLocation}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    KSh {newTaskNotification.amount}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className="mt-3 bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleAcceptTask(newTaskNotification.id)}
                >
                  Accept Task
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Task Alert */}
        {erranderActiveTask && (
          <Card className="mb-8 border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-emerald-800 dark:text-emerald-200">Active Task</span>
                    <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-300">
                      {erranderActiveTask.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">{erranderActiveTask.title}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {erranderActiveTask.taskLocation}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    KSh {erranderActiveTask.amount}
                  </div>
                  <Link to="/directions">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                      <Navigation className="w-4 h-4" />
                      Directions
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earnings</h4>
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">KSh {stats.totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% this week
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</h4>
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedTasks}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tasks this month</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</h4>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rating}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average rating</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Clients</h4>
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeClients}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Regular customers</p>
          </div>
        </div>

        {/* Available Tasks Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Available Tasks</h3>
              <Badge variant="outline" className="ml-2">
                {availableTasks.length} available
              </Badge>
            </div>
            <Link to="/tasks">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {availableTasks.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No tasks available at the moment</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Check back soon for new opportunities!</p>
              </div>
            ) : (
              availableTasks.slice(0, 3).map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {task.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {task.taskLocation}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(task.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                          KSh {task.amount}
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleAcceptTask(task.id)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <Link 
            to="/tasks" 
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Package className="w-10 h-10 sm:w-12 sm:h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Browse Tasks</h3>
              <p className="text-emerald-100">Find available errands</p>
            </div>
          </Link>

          <Link 
            to="/directions" 
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Navigation className="w-10 h-10 sm:w-12 sm:h-12 mb-4 group-hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Directions</h3>
              <p className="text-blue-100">Navigate to your task</p>
            </div>
          </Link>

          <Link 
            to="/wallet" 
            className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">My Wallet</h3>
              <p className="text-purple-100">Check earnings & withdraw</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
