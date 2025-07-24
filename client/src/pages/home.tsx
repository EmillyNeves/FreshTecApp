import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Truck, AlertTriangle } from "lucide-react";

export default function Home() {
  const alertsData = [
    { id: 1, title: "Temperature Alert", message: "Refrigerator B temperature rising", type: "warning", icon: Thermometer },
    { id: 2, title: "Humidity Low", message: "Storage room humidity below optimal", type: "info", icon: Droplets },
    { id: 3, title: "Delivery Delayed", message: "Shipment #1234 delayed by 2 hours", type: "error", icon: Truck },
  ];

  const statusData = [
    { label: "Fresh Items", value: "847", status: "good", color: "bg-green-500" },
    { label: "Near Expiry", value: "23", status: "warning", color: "bg-yellow-500" },
    { label: "Expired", value: "3", status: "error", color: "bg-red-500" },
    { label: "In Transit", value: "156", status: "info", color: "bg-blue-500" },
  ];

  return (
    <Layout>
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Good Morning!</h2>
          <p className="text-neutral-600">Here's your freshness overview for today</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4">
          {statusData.map((item, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <div>
                    <p className="text-sm text-neutral-600">{item.label}</p>
                    <p className="text-xl font-bold text-neutral-800">{item.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Alerts */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <AlertTriangle className="w-5 h-5 text-primary mr-2" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alertsData.map((alert) => {
              const Icon = alert.icon;
              return (
                <div key={alert.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-yellow-100' :
                    alert.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      alert.type === 'warning' ? 'text-yellow-600' :
                      alert.type === 'error' ? 'text-red-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-800">{alert.title}</h4>
                    <p className="text-sm text-neutral-600">{alert.message}</p>
                  </div>
                  <Badge variant={alert.type === 'error' ? 'destructive' : 'secondary'}>
                    {alert.type}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Add Inventory
            </button>
            <button className="p-4 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors">
              Schedule Delivery
            </button>
            <button className="p-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors">
              Generate Report
            </button>
            <button className="p-4 bg-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-700 transition-colors">
              View Analytics
            </button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
