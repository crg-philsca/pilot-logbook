import { User, Mail, Phone, Award, Settings } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function ProfileScreen() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 pt-8 pb-12 shadow-lg">
        <h1 className="text-2xl mb-1">Profile</h1>
        <p className="text-blue-100 text-sm">Your pilot information</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 -mt-6">
        {/* Profile Card */}
        <Card className="shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-6 mb-4">
                <User className="h-16 w-16 text-white" />
              </div>
              <h2 className="text-2xl mb-1">Captain Pilot</h2>
              <p className="text-gray-600 text-sm mb-4">Commercial Pilot</p>
              <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                <Award className="h-4 w-4" />
                <span className="text-sm">ATP License</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-l-4 border-l-blue-600 mb-4">
          <CardContent className="p-5">
            <h3 className="text-base mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="text-base">pilot@aviation.com</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="text-base">+1 (555) 123-4567</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Button */}
        <Button
          variant="outline"
          className="w-full h-14 text-base rounded-2xl border-gray-300 hover:bg-gray-50"
        >
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
