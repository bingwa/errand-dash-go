
import { useState } from "react";
import { User2, Users, LogIn, ArrowLeft, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import userAvatars from "@/data/userAvatars";
import erranderAvatars from "@/data/erranderAvatars";

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

const requiredDocs = [
  { name: "National ID", uploaded: false },
  { name: "Driver's License", uploaded: false },
  { name: "Certificate of Good Conduct", uploaded: false },
  { name: "Bank Statement", uploaded: false },
  { name: "Profile Photo", uploaded: false }
];

export default function Home({ onSignIn }) {
  const [step, setStep] = useState<"pick" | "login" | "register" | "docs" | "signedin">("pick");
  const [role, setRole] = useState<"user" | "errander" | "">("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    emergencyContact: "",
    vehicleInfo: ""
  });
  const [docs, setDocs] = useState(requiredDocs);

  function handleInputChange(field: string, value: string) {
    setFormData({ ...formData, [field]: value });
  }

  function handleDocUpload(index: number) {
    const newDocs = [...docs];
    newDocs[index].uploaded = true;
    setDocs(newDocs);
  }

  function handleAuth() {
    if (role === "errander" && step === "register") {
      setStep("docs");
      return;
    }
    
    if (formData.name && formData.email) {
      onSignIn({ role, name: formData.name });
      setStep("signedin");
    }
  }

  function handleErranderComplete() {
    const allDocsUploaded = docs.every(doc => doc.uploaded);
    if (allDocsUploaded) {
      onSignIn({ role, name: formData.name });
      setStep("signedin");
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 mobile-safe-area">
      <div className="max-w-md w-full">
        
        {step === "pick" && (
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold tracking-tight mb-2">
                Welcome to ErrandDash
              </CardTitle>
              <CardDescription className="text-gray-600">
                Your trusted partner for getting things done
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 font-semibold text-center text-gray-700">Choose your role:</p>
              <div className="space-y-4">
                {roles.map(r => (
                  <Button
                    key={r.key}
                    onClick={() => { setRole(r.key as any); setStep("register"); }}
                    className={`w-full h-16 bg-gradient-to-r ${r.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                  >
                    <div className="flex items-center gap-3">
                      {r.icon}
                      <div className="text-left">
                        <p className="font-bold text-lg">{r.label}</p>
                        <p className="text-sm opacity-90">{r.description}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="link" onClick={() => setStep("login")} className="text-gray-600">
                  Already have an account? Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "login" && (
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
            <CardHeader className="text-center">
              <Button
                variant="ghost"
                onClick={() => setStep("pick")}
                className="absolute left-4 top-4 p-2"
              >
                <ArrowLeft size={20} />
              </Button>
              <CardTitle className="text-xl font-bold">
                Sign In as {role === "user" ? "User" : "Errander"}
              </CardTitle>
              <CardDescription>Welcome back! Please sign in to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={e => handleInputChange("password", e.target.value)}
                />
              </div>
              <Button className="w-full mt-6" onClick={handleAuth}>
                <LogIn className="mr-2" size={18} />
                Sign In
              </Button>
              <Button variant="link" className="w-full" onClick={() => setStep("register")}>
                Don't have an account? Sign Up
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "register" && (
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
            <CardHeader className="text-center">
              <Button
                variant="ghost"
                onClick={() => setStep("pick")}
                className="absolute left-4 top-4 p-2"
              >
                <ArrowLeft size={20} />
              </Button>
              <CardTitle className="text-xl font-bold">
                Sign Up as {role === "user" ? "User" : "Errander"}
              </CardTitle>
              <CardDescription>
                {role === "user" 
                  ? "Create your account to start booking errands" 
                  : "Join our errander network and start earning"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+254 XXX XXX"
                    value={formData.phone}
                    onChange={e => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your address"
                  value={formData.address}
                  onChange={e => handleInputChange("address", e.target.value)}
                />
              </div>

              {role === "errander" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Emergency Contact</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Emergency contact number"
                      value={formData.emergencyContact}
                      onChange={e => handleInputChange("emergencyContact", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Vehicle Information</label>
                    <input
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Motorcycle, Car, Bicycle"
                      value={formData.vehicleInfo}
                      onChange={e => handleInputChange("vehicleInfo", e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create password"
                    type="password"
                    value={formData.password}
                    onChange={e => handleInputChange("password", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={e => handleInputChange("confirmPassword", e.target.value)}
                  />
                </div>
              </div>

              <Button className="w-full mt-6" onClick={handleAuth}>
                <LogIn className="mr-2" size={18} />
                {role === "errander" ? "Continue to Document Upload" : "Create Account"}
              </Button>
              
              <Button variant="link" className="w-full" onClick={() => setStep("login")}>
                Already have an account? Sign In
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "docs" && (
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
            <CardHeader className="text-center">
              <Button
                variant="ghost"
                onClick={() => setStep("register")}
                className="absolute left-4 top-4 p-2"
              >
                <ArrowLeft size={20} />
              </Button>
              <CardTitle className="text-xl font-bold">Document Verification</CardTitle>
              <CardDescription>
                Upload the required documents to complete your errander registration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {docs.map((doc, index) => (
                <div key={doc.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {doc.uploaded ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <AlertCircle className="text-orange-500" size={20} />
                    )}
                    <span className="font-medium">{doc.name}</span>
                  </div>
                  {!doc.uploaded ? (
                    <Button size="sm" onClick={() => handleDocUpload(index)} className="gap-1">
                      <Upload size={14} />
                      Upload
                    </Button>
                  ) : (
                    <span className="text-green-600 text-sm font-medium">Uploaded ✓</span>
                  )}
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> All documents will be verified within 24-48 hours. 
                  You'll receive an email once your account is approved.
                </p>
              </div>

              <Button 
                className="w-full mt-6" 
                onClick={handleErranderComplete}
                disabled={!docs.every(doc => doc.uploaded)}
              >
                Complete Registration
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Featured sections */}
      {step === "pick" && (
        <div className="mt-8 grid grid-cols-2 gap-12">
          <div>
            <span className="block mb-2 text-white/80 text-xs font-medium">Featured Users</span>
            <div className="flex gap-2">
              {userAvatars.slice(0,3).map(u => (
                <img key={u.name} src={u.avatarUrl} className="w-12 h-12 rounded-full ring-2 ring-white/50" alt={u.name} title={u.name} />
              ))}
            </div>
          </div>
          <div>
            <span className="block mb-2 text-white/80 text-xs font-medium">Top Erranders</span>
            <div className="flex gap-2">
              {erranderAvatars.slice(0,3).map(e => (
                <img key={e.name} src={e.avatarUrl} className="w-12 h-12 rounded-full ring-2 ring-white/50" alt={e.name} title={e.name} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
