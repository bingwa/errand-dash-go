
import { Link } from "react-router-dom";
import { ClipboardCheck, Search, Plus, Calendar, Clock, Star } from "lucide-react";

export default function UserDashboard() {
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
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">In progress</p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-500">Completed</h4>
              <ClipboardCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">This month</p>
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
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-600 flex-1">Grocery delivery completed</span>
              <span className="text-xs text-gray-400">2h ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-600 flex-1">Document pickup in progress</span>
              <span className="text-xs text-gray-400">4h ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm text-gray-600 flex-1">New errander assigned</span>
              <span className="text-xs text-gray-400">6h ago</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
