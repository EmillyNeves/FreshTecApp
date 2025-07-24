import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function Analytics() {
  const freshnessData = [
    { day: "Mon", freshness: 85 },
    { day: "Tue", freshness: 89 },
    { day: "Wed", freshness: 82 },
    { day: "Thu", freshness: 91 },
    { day: "Fri", freshness: 88 },
    { day: "Sat", freshness: 86 },
    { day: "Sun", freshness: 90 },
  ];

  const inventoryData = [
    { category: "Fruits", count: 245 },
    { category: "Vegetables", count: 312 },
    { category: "Dairy", count: 156 },
    { category: "Meat", count: 89 },
    { category: "Bakery", count: 67 },
  ];

  const chartConfig = {
    freshness: {
      label: "Freshness Level",
      color: "hsl(var(--primary))",
    },
    count: {
      label: "Inventory Count",
      color: "hsl(var(--secondary))",
    },
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Analytics Dashboard</h2>
          <p className="text-neutral-600">Track freshness and inventory metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-neutral-600">Avg Freshness</p>
                <p className="text-2xl font-bold text-primary">87.3%</p>
                <p className="text-xs text-green-600">↑ 2.1% vs last week</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-neutral-600">Total Items</p>
                <p className="text-2xl font-bold text-secondary">869</p>
                <p className="text-xs text-green-600">↑ 5.2% vs last week</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Freshness Trend Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Freshness Trend (7 Days)</CardTitle>
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

        {/* Inventory Distribution */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Inventory by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Waste Reduction</span>
              <span className="font-bold text-green-600">-15.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Storage Efficiency</span>
              <span className="font-bold text-blue-600">92.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Delivery On-Time</span>
              <span className="font-bold text-purple-600">96.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Cost Savings</span>
              <span className="font-bold text-amber-600">$2,847</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
