
import { useState } from "react";
import { User, Mail, Phone, MapPin, Camera, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 712 345 678",
    location: "Nairobi, Kenya",
    bio: "Experienced errander with 5 years of service. Reliable and fast delivery guaranteed!"
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mobile-safe-area">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
          <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="gap-2"
            size="sm"
          >
            <Edit3 size={16} />
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 sm:h-28 sm:w-28">
                  <AvatarImage src="" alt="Profile picture" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                >
                  <Camera size={14} />
                </Button>
              </div>
              
              <div className="flex-1 text-center sm:text-left space-y-2">
                {isEditing ? (
                  <input 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="text-xl font-bold bg-transparent border-b border-gray-300 focus:border-primary outline-none"
                  />
                ) : (
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{profile.name}</h2>
                )}
                
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{profile.location}</span>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">4.9</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">142</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">98%</p>
                    <p className="text-xs text-gray-500">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-gray-500" />
              {isEditing ? (
                <input 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="flex-1 bg-transparent border-b border-gray-300 focus:border-primary outline-none"
                />
              ) : (
                <span className="flex-1">{profile.email}</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-gray-500" />
              {isEditing ? (
                <input 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="flex-1 bg-transparent border-b border-gray-300 focus:border-primary outline-none"
                />
              ) : (
                <span className="flex-1">{profile.phone}</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full h-24 bg-transparent border border-gray-300 rounded-lg p-3 focus:border-primary outline-none resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
