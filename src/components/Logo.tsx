
import React from 'react';

const Logo = ({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center transform rotate-12">
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center transform -rotate-12">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
      </div>
      <span className={`font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent ${sizeClasses[size]}`}>
        MjuziGo
      </span>
    </div>
  );
};

export default Logo;
