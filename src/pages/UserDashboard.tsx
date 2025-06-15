
import { Link } from "react-router-dom";
import { useTask } from "@/contexts/TaskContext";
import { ClipboardCheck, Search, Plus, Calendar, Clock, Star, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UserDashboard() {
  const { tasks, activeTask } = useTask();
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mobile-safe-area">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back! 👋
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Need something done? Book an errand and let our trusted erranders handle it for you.
          </p>
        </div>

        {/* Active Task Alert */}
        {activeTask && (
          <Card className="mb-8 border-l-4 border-l-emerald-500 bg-emerald-50/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-800">Active Task</span>
                    <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700">
                      {activeTask.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-emerald-700">{activeTask.title}</p>
                  <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {activeTask.taskLocation}
                  </p>
                </div>
                <Link to="/tracking">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                    Track <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 px-4 sm:px-0">
          <Link 
            to="/book" 
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Plus className="w-10 h-10 sm:w-12 sm:h-12 mb-4 group-hover:rotate-90 transition-transform duration-300" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Book New Errand</h3>
              <p className="text-blue-100">Create a new task request</p>
            </div>
          </Link>

          <Link 
            to="/tracking" 
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <Search className="w-10 h-10 sm:w-12 sm:h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Track Orders</h3>
              <p className="text-emerald-100">Monitor your active tasks</p>
            </div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4 sm:px-0">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500">Active Tasks</h4>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeTask ? 1 : 0}</p>
            <p className="text-sm text-gray-600">In progress</p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500">Completed</h4>
              <ClipboardCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedTasks.length}</p>
            <p className="text-sm text-gray-600">Total tasks</p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500">Average Rating</h4>
              <div className="text-yellow-400">⭐</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-sm text-gray-600">From erranders</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 mx-4 sm:mx-0">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Activity</h3>
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">No tasks yet. Book your first errand!</p>
              </div>
            ) : (
              tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    task.status === 'completed' ? 'bg-emerald-500' : 
                    task.status === 'in-progress' ? 'bg-blue-500' : 'bg-amber-500'
                  }`}></div>
                  <span className="text-sm text-gray-600 flex-1">{task.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {task.status}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
