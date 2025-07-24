import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { 
  TrendingUp, BarChart3, Leaf, Truck, Package, TreePine, 
  Users, Thermometer, Clock, AlertTriangle, Home, Settings, Calendar
} from "lucide-react";
import { Link, useLocation } from 'wouter';

export default function Analytics() {
  const { user } = useAuth();
  const [location] = useLocation();

  // Diferentes dados baseados no tipo de usuário
  const getAnalyticsData = () => {
    switch (user?.role) {
      case 'producer':
        return {
          title: "Análises de Produção",
          subtitle: "Monitoramento de lotes e qualidade",
          primaryMetrics: [
            { label: "Qualidade Média", value: "92.5%", change: "+3.2%", color: "text-green-600" },
            { label: "Lotes Ativos", value: "24", change: "+2", color: "text-blue-600" },
            { label: "Pegada CO2", value: "2.1t", change: "-0.3t", color: "text-green-600" },
            { label: "Conformidade", value: "98.5%", change: "+1.2%", color: "text-purple-600" }
          ],
          chartData: [
            { day: "Seg", qualidade: 90, temperatura: 22, umidade: 65 },
            { day: "Ter", qualidade: 92, temperatura: 21, umidade: 68 },
            { day: "Qua", qualidade: 89, temperatura: 23, umidade: 62 },
            { day: "Qui", qualidade: 94, temperatura: 20, umidade: 70 },
            { day: "Sex", qualidade: 93, temperatura: 22, umidade: 66 },
            { day: "Sab", qualidade: 91, temperatura: 21, umidade: 69 },
            { day: "Dom", qualidade: 95, temperatura: 19, umidade: 72 }
          ]
        };
      case 'transporter':
        return {
          title: "Análises de Transporte",
          subtitle: "Eficiência logística e condições de transporte",
          primaryMetrics: [
            { label: "Rotas Eficientes", value: "89.2%", change: "+5.1%", color: "text-green-600" },
            { label: "Temp. Média", value: "18.5°C", change: "-0.8°C", color: "text-blue-600" },
            { label: "Entregas Prazo", value: "96.3%", change: "+2.1%", color: "text-green-600" },
            { label: "Economia CO2", value: "1.8t", change: "+0.4t", color: "text-green-600" }
          ],
          chartData: [
            { day: "Seg", eficiencia: 87, temperatura: 19, entregas: 28 },
            { day: "Ter", eficiencia: 89, temperatura: 18, entregas: 32 },
            { day: "Qua", eficiencia: 86, temperatura: 20, entregas: 25 },
            { day: "Qui", eficiencia: 92, temperatura: 17, entregas: 35 },
            { day: "Sex", eficiencia: 91, temperatura: 18, entregas: 30 },
            { day: "Sab", eficiencia: 88, temperatura: 19, entregas: 22 },
            { day: "Dom", eficiencia: 90, temperatura: 18, entregas: 28 }
          ]
        };
      case 'retailer':
        return {
          title: "Análises de Varejo",
          subtitle: "Gestão de estoque e vendas",
          primaryMetrics: [
            { label: "Itens Frescos", value: "847", change: "+23", color: "text-green-600" },
            { label: "Giro Estoque", value: "3.2x", change: "+0.4x", color: "text-blue-600" },
            { label: "Desperdício", value: "2.1%", change: "-0.8%", color: "text-green-600" },
            { label: "Satisfação", value: "94.7%", change: "+1.5%", color: "text-purple-600" }
          ],
          chartData: [
            { day: "Seg", vendas: 145, estoque: 892, desperdicio: 3.2 },
            { day: "Ter", vendas: 167, estoque: 856, desperdicio: 2.8 },
            { day: "Qua", vendas: 134, estoque: 901, desperdicio: 3.5 },
            { day: "Qui", vendas: 189, estoque: 823, desperdicio: 2.1 },
            { day: "Sex", vendas: 201, estoque: 798, desperdicio: 1.9 },
            { day: "Sab", vendas: 223, estoque: 756, desperdicio: 1.6 },
            { day: "Dom", vendas: 156, estoque: 834, desperdicio: 2.3 }
          ]
        };
      default: // consumer
        return {
          title: "Suas Análises Pessoais",
          subtitle: "Impacto ambiental e economia doméstica",
          primaryMetrics: [
            { label: "Desperdício Evitado", value: "4.2kg", change: "+0.8kg", color: "text-green-600" },
            { label: "CO2 Economizado", value: "2.1kg", change: "+0.4kg", color: "text-green-600" },
            { label: "Economia R$", value: "R$ 89", change: "+R$ 15", color: "text-blue-600" },
            { label: "Alimentos Ativos", value: "12", change: "+3", color: "text-purple-600" }
          ],
          chartData: [
            { day: "Seg", economia: 12, desperdicio: 0.3, frescor: 92 },
            { day: "Ter", economia: 15, desperdicio: 0.1, frescor: 94 },
            { day: "Qua", economia: 8, desperdicio: 0.4, frescor: 89 },
            { day: "Qui", economia: 18, desperdicio: 0.2, frescor: 95 },
            { day: "Sex", economia: 22, desperdicio: 0.1, frescor: 96 },
            { day: "Sab", economia: 14, desperdicio: 0.3, frescor: 91 },
            { day: "Dom", economia: 16, desperdicio: 0.2, frescor: 93 }
          ]
        };
    }
  };

  const analyticsData = getAnalyticsData();

  const getChartDataKey = () => {
    switch (user?.role) {
      case 'producer': return 'qualidade';
      case 'transporter': return 'eficiencia';
      case 'retailer': return 'vendas';
      default: return 'economia';
    }
  };

  const getChartTitle = () => {
    switch (user?.role) {
      case 'producer': return 'Qualidade dos Lotes';
      case 'transporter': return 'Eficiência de Transporte';
      case 'retailer': return 'Performance de Vendas';
      default: return 'Economia Semanal';
    }
  };

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 bottom-nav mx-auto shadow-lg">
      <div className="flex justify-around items-center py-3 px-2">
        <Link href="/" className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
          location === '/' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}>
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Início</span>
        </Link>
        <Link href="/analytics" className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
          location === '/analytics' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}>
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs font-medium">Análises</span>
        </Link>
        <Link href="/calendar" className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
          location === '/calendar' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}>
          <Calendar className="w-5 h-5" />
          <span className="text-xs font-medium">Agenda</span>
        </Link>
        <Link href="/settings" className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
          location === '/settings' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}>
          <Settings className="w-5 h-5" />
          <span className="text-xs font-medium">Config</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mobile-container">
        <div className="p-4 space-y-6 pb-24">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-2xl p-6 border border-primary/20 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{analyticsData.title}</h2>
            <p className="text-gray-600">{analyticsData.subtitle}</p>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-2 gap-3">
            {analyticsData.primaryMetrics.map((metric, index) => (
              <Card key={index} className="border-0 shadow-sm bg-white">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900 my-1">{metric.value}</p>
                    <p className={`text-xs ${metric.color}`}>{metric.change}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gráfico Principal */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {getChartTitle()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <LineChart data={analyticsData.chartData} width={350} height={240}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Line 
                    type="monotone" 
                    dataKey={getChartDataKey()} 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </div>
            </CardContent>
          </Card>

          {/* Insights Específicos por Tipo de Usuário */}
          {user?.role === 'producer' && (
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <TreePine className="w-5 h-5 mr-2 text-green-600" />
                  Sustentabilidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Redução CO2 este mês</span>
                  <span className="font-bold text-green-600">-15.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Água economizada</span>
                  <span className="font-bold text-blue-600">2.847L</span>
                </div>
              </CardContent>
            </Card>
          )}

          {user?.role === 'transporter' && (
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  Otimização de Rotas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Combustível economizado</span>
                  <span className="font-bold text-green-600">R$ 1.247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tempo médio de entrega</span>
                  <span className="font-bold text-blue-600">2.3h</span>
                </div>
              </CardContent>
            </Card>
          )}

          {user?.role === 'retailer' && (
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-purple-600" />
                  Gestão de Estoque
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Produtos próx. vencimento</span>
                  <span className="font-bold text-yellow-600">23 itens</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Previsão de vendas</span>
                  <span className="font-bold text-green-600">↑ 12.5%</span>
                </div>
              </CardContent>
            </Card>
          )}

          {user?.role === 'consumer' && (
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Impacto Comunitário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Alimentos doados</span>
                  <span className="font-bold text-purple-600">3 itens</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ranking na comunidade</span>
                  <span className="font-bold text-green-600">#47</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
}