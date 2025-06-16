
import { Link } from "react-router-dom";
import { Package, Navigation, DollarSign, Clock, Star, TrendingUp } from "lucide-react";

export default function ErranderDashboard() {
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
            <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">In progress</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</h4>
              <Package className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
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
            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Grocery Pickup</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sarit Center → Riverside</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-600 dark:text-orange-400">KSh 550</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Due in 2h</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Document Delivery</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CBD → Westlands</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600 dark:text-purple-400">KSh 300</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Due in 4h</p>
              </div>
            </div>
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
