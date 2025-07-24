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
    { category: "Frutas", count: 245 },
    { category: "Vegetais", count: 312 },
    { category: "Laticínios", count: 156 },
    { category: "Carnes", count: 89 },
    { category: "Padaria", count: 67 },
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
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Painel de Análises</h2>
          <p className="text-neutral-600">Acompanhe métricas de frescor e estoque</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-neutral-600">Frescor Médio</p>
                <p className="text-2xl font-bold text-primary">87.3%</p>
                <p className="text-xs text-green-600">↑ 2.1% vs semana passada</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-neutral-600">Total de Itens</p>
                <p className="text-2xl font-bold text-secondary">869</p>
                <p className="text-xs text-green-600">↑ 5.2% vs semana passada</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Freshness Trend Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Tendência de Frescor (7 Dias)</CardTitle>
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
            <CardTitle className="text-lg">Estoque por Categoria</CardTitle>
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
            <CardTitle className="text-lg">Métricas de Desempenho</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Redução de Desperdício</span>
              <span className="font-bold text-green-600">-15.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Eficiência de Armazenamento</span>
              <span className="font-bold text-blue-600">92.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Entregas no Prazo</span>
              <span className="font-bold text-purple-600">96.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Economia de Custos</span>
              <span className="font-bold text-amber-600">R$ 2.847</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
