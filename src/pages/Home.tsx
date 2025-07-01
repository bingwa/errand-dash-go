
import { Link } from "react-router-dom";
import { User2, Users, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const roles = [
  { 
    key: "user", 
    label: "User", 
    icon: <User2 className="mr-2" />,
    description: "Book errands and get things done",
    color: "from-blue-500 to-purple-600"
  },
  { 
    key: "errander", 
    label: "Errander", 
    icon: <Users className="mr-2" />,
    description: "Earn money by completing tasks",
    color: "from-emerald-500 to-teal-600"
  }
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 mobile-safe-area">
      <div className="max-w-md w-full">
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight mb-2 dark:text-white">
              Welcome to MjuziGo
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Your trusted partner for getting things done
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 font-semibold text-center text-gray-700 dark:text-gray-200">Choose your role:</p>
            <div className="space-y-4">
              {roles.map(r => (
                <Button
                  key={r.key}
                  asChild
                  className={`w-full h-16 bg-gradient-to-r ${r.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <Link to="/auth">
                    <div className="flex items-center gap-3">
                      {r.icon}
                      <div className="text-left">
                        <p className="font-bold text-lg">{r.label}</p>
                        <p className="text-sm opacity-90">{r.description}</p>
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="link" asChild className="text-gray-600 dark:text-gray-300">
                <Link to="/auth">
                  <LogIn className="mr-2" size={16} />
                  Already have an account? Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
