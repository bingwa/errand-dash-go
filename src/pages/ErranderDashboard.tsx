
import { Link } from "react-router-dom";
import { Package, Navigation, DollarSign, Clock, Star, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import { useTask } from "@/contexts/TaskContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ErranderDashboard() {
  const { erranderActiveTask, availableTasks } = useTask();

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Errander Hub 🚀
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to earn? Find available jobs, navigate to tasks, and manage your errands efficiently.
          </p>
        </div>

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
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200 mt-1">
                    KSh {erranderActiveTask.amount}
                  </p>
                </div>
                <Link to="/directions">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                    Navigate <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Link 
            to="/tasks" 
            className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Package className="w-12 h-12 mb-4 group-hover:bounce transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">Available Jobs</h3>
              <p className="text-orange-100">Browse and accept new tasks</p>
              <div className="mt-2">
                <span className="bg-white/20 px-2 py-1 rounded text-sm">
                  {availableTasks.length} tasks available
                </span>
              </div>
            </div>
          </Link>

          <Link 
            to="/directions" 
            className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Navigation className="w-12 h-12 mb-4 group-hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">Navigate to Tasks</h3>
              <p className="text-purple-100">Get directions to your jobs</p>
              {erranderActiveTask && (
                <div className="mt-2">
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    Active task ready
                  </span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Jobs</h4>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{erranderActiveTask ? 1 : 0}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">In progress</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Available</h4>
              <Package className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{availableTasks.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">New tasks</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</h4>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">From customers</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Earnings</h4>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">KSh 12,400</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
          </div>
        </div>

        {/* Current Jobs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Current Jobs</h3>
          <div className="space-y-4">
            {erranderActiveTask ? (
              <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{erranderActiveTask.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{erranderActiveTask.userLocation} → {erranderActiveTask.taskLocation}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600 dark:text-orange-400">KSh {erranderActiveTask.amount}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{erranderActiveTask.status}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No active jobs. Check the Available Jobs to find tasks to accept!
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Performance This Week</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">98%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">On-time delivery</p>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">15</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Jobs completed</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">4.9</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg rating</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">KSh 3,200</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Week earnings</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
