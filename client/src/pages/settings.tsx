import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { 
  Bell, 
  Sprout, 
  Thermometer, 
  Truck, 
  Megaphone, 
  BarChart3, 
  Globe, 
  Palette, 
  Database, 
  Shield, 
  Download, 
  LogOut,
  ChevronRight
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    freshness: true,
    temperature: false,
    delivery: true,
    marketing: false,
  });

  const handleNotificationChange = (type: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const freshnessData = [
    { day: "Mon", freshness: 85 },
    { day: "Tue", freshness: 89 },
    { day: "Wed", freshness: 82 },
    { day: "Thu", freshness: 91 },
    { day: "Fri", freshness: 88 },
    { day: "Sat", freshness: 86 },
    { day: "Sun", freshness: 90 },
  ];

  const chartConfig = {
    freshness: {
      label: "Freshness Level",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        {/* User Profile */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-neutral-800">Emily Rodriguez</h2>
                <p className="text-neutral-600">emily@freshtec.com</p>
                <Badge className="mt-1 bg-primary/10 text-primary hover:bg-primary/20">
                  Premium Plan
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Bell className="w-5 h-5 text-primary mr-3" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800">Freshness Alerts</h4>
                  <p className="text-sm text-neutral-600">Get notified about produce freshness</p>
                </div>
              </div>
              <Switch
                checked={notifications.freshness}
                onCheckedChange={(value: boolean) => handleNotificationChange('freshness', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800">Temperature Monitoring</h4>
                  <p className="text-sm text-neutral-600">Monitor storage temperature changes</p>
                </div>
              </div>
              <Switch
                checked={notifications.temperature}
                onCheckedChange={(value: boolean) => handleNotificationChange('temperature', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800">Delivery Updates</h4>
                  <p className="text-sm text-neutral-600">Track delivery status and timing</p>
                </div>
              </div>
              <Switch
                checked={notifications.delivery}
                onCheckedChange={(value: boolean) => handleNotificationChange('delivery', value)}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800">Marketing Updates</h4>
                  <p className="text-sm text-neutral-600">Receive promotional offers and tips</p>
                </div>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(value: boolean) => handleNotificationChange('marketing', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Freshness Analytics */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <BarChart3 className="w-5 h-5 text-primary mr-3" />
              Freshness Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <LineChart data={freshnessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[75, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="freshness"
                  stroke="var(--color-freshness)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-freshness)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Globe className="w-5 h-5 text-primary mr-3" />
              App Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-neutral-600" />
                <span className="font-medium text-neutral-800">Language</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-neutral-600">English</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-neutral-600" />
                <span className="font-medium text-neutral-800">Theme</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-neutral-600">Light</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-neutral-600" />
                <span className="font-medium text-neutral-800">Data & Storage</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  2.1 GB
                </Badge>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-neutral-600" />
                <span className="font-medium text-neutral-800">Privacy & Security</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center">
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </button>
          
          <button className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </Layout>
  );
}
