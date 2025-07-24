import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Container, Thermometer, Droplets, Zap, Wifi, AlertTriangle,
  Plus, Settings, Bluetooth, Clock, Leaf, ArrowLeft, Home,
  TrendingUp, Calendar, Package, CheckCircle, XCircle
} from "lucide-react";
import { Link, useLocation } from 'wouter';

export default function SmartContainer() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);

  // Dados simulados dos Potes Inteligentes
  const smartContainers = [
    {
      id: "pot-001",
      name: "Pote da Geladeira",
      bluetoothId: "FT-POT-001",
      batteryLevel: 87,
      lastSync: "há 5 min",
      sensors: {
        temperature: 4.2,
        humidity: 82,
        airQuality: 95,
        light: 5
      },
      settings: {
        optimalTemp: 4,
        optimalHumidity: 80,
        alertsEnabled: true,
        autoOptimize: true
      },
      contents: [
        {
          id: "item-001",
          name: "Tomates Orgânicos",
          category: "Vegetais",
          freshnessLevel: "high",
          remainingDays: 5,
          passportId: "T001-20250124",
          addedDate: "Hoje"
        },
        {
          id: "item-002",
          name: "Queijo Minas",
          category: "Laticínios",
          freshnessLevel: "medium",
          remainingDays: 2,
          passportId: "Q002-20250122",
          addedDate: "Ontem"
        }
      ],
      alerts: [
        {
          type: "expiration",
          severity: "medium",
          message: "Queijo Minas vence em 2 dias",
          timestamp: new Date(),
          resolved: false
        }
      ]
    },
    {
      id: "pot-002",
      name: "Pote da Despensa",
      bluetoothId: "FT-POT-002",
      batteryLevel: 64,
      lastSync: "há 2h",
      sensors: {
        temperature: 22.1,
        humidity: 45,
        airQuality: 89,
        light: 15
      },
      settings: {
        optimalTemp: 20,
        optimalHumidity: 50,
        alertsEnabled: true,
        autoOptimize: false
      },
      contents: [
        {
          id: "item-003",
          name: "Bananas Orgânicas",
          category: "Frutas",
          freshnessLevel: "high",
          remainingDays: 3,
          passportId: "B003-20250123",
          addedDate: "Hoje"
        }
      ],
      alerts: []
    }
  ];

  const getFreshnessColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
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

  if (selectedContainer) {
    const container = smartContainers.find(c => c.id === selectedContainer);
    if (!container) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mobile-container">
          <div className="p-4 space-y-6 pb-24">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => setSelectedContainer(null)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-bold text-gray-800">{container.name}</h1>
            </div>

            {/* Status Geral */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Container className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{container.name}</h3>
                      <p className="text-sm text-gray-600">{container.bluetoothId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Zap className={`w-4 h-4 ${getBatteryColor(container.batteryLevel)}`} />
                      <span className={`font-semibold ${getBatteryColor(container.batteryLevel)}`}>
                        {container.batteryLevel}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Sincronizado {container.lastSync}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Thermometer className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Temperatura</p>
                    <p className="font-bold text-blue-600">{container.sensors.temperature}°C</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Droplets className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Umidade</p>
                    <p className="font-bold text-green-600">{container.sensors.humidity}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alertas */}
            {container.alerts.length > 0 && (
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                    Alertas Ativos ({container.alerts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {container.alerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}>
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-800">{alert.message}</p>
                        <Badge variant="outline" className="text-xs">
                          {alert.severity === 'high' && 'Alto'}
                          {alert.severity === 'medium' && 'Médio'}
                          {alert.severity === 'low' && 'Baixo'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Conteúdo do Pote */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-purple-600 mr-2" />
                    Conteúdo ({container.contents.length} itens)
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {container.contents.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category} • Adicionado {item.addedDate}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`border text-xs ${getFreshnessColor(item.freshnessLevel)}`}>
                          {item.freshnessLevel === 'high' && 'Muito Fresco'}
                          {item.freshnessLevel === 'medium' && 'Moderado'}
                          {item.freshnessLevel === 'low' && 'Consumir Logo'}
                        </Badge>
                        <span className="text-xs text-gray-500">{item.remainingDays} dias restantes</span>
                      </div>
                    </div>
                    <Link href={`/qr-scanner?passport=${item.passportId}`}>
                      <Button size="sm" variant="ghost">
                        Ver Histórico
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Configurações do Pote */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Settings className="w-5 h-5 text-gray-600 mr-2" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Alertas Automáticos</h4>
                    <p className="text-sm text-gray-600">Notificações sobre vencimentos e condições</p>
                  </div>
                  <Switch checked={container.settings.alertsEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Otimização Automática</h4>
                    <p className="text-sm text-gray-600">Ajuste automático das condições de armazenamento</p>
                  </div>
                  <Switch checked={container.settings.autoOptimize} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">Temperatura Ideal</p>
                    <p className="font-semibold text-gray-800">{container.settings.optimalTemp}°C</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Umidade Ideal</p>
                    <p className="font-semibold text-gray-800">{container.settings.optimalHumidity}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <BottomNavigation />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mobile-container">
        <div className="p-4 space-y-6 pb-24">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <Container className="w-6 h-6 text-blue-600 mr-3" />
              Potes Inteligentes
            </h2>
            <p className="text-gray-600">Monitore e otimize o armazenamento dos seus alimentos</p>
          </div>

          {/* Status Geral - Compacto */}
          <div className="grid grid-cols-2 gap-2">
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <Container className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Conectados</p>
                <p className="text-xl font-bold text-gray-900">{smartContainers.length}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-3 text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-xs text-gray-600">Itens</p>
                <p className="text-xl font-bold text-gray-900">
                  {smartContainers.reduce((total, container) => total + container.contents.length, 0)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Potes - Layout otimizado */}
          <div className="space-y-3">
            {smartContainers.map((container) => (
              <Card key={container.id} className="border-0 shadow-sm bg-white">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Container className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-800">{container.name}</h3>
                        <p className="text-xs text-gray-600">{container.contents.length} itens</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {container.alerts.length > 0 && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Zap className={`w-3 h-3 ${getBatteryColor(container.batteryLevel)}`} />
                          <span className={`text-xs ${getBatteryColor(container.batteryLevel)}`}>
                            {container.batteryLevel}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="text-center p-1.5 bg-blue-50 rounded">
                      <p className="text-xs text-gray-600">Temp</p>
                      <p className="text-sm font-bold text-blue-600">{container.sensors.temperature}°C</p>
                    </div>
                    <div className="text-center p-1.5 bg-green-50 rounded">
                      <p className="text-xs text-gray-600">Umidade</p>
                      <p className="text-sm font-bold text-green-600">{container.sensors.humidity}%</p>
                    </div>
                    <div className="text-center p-1.5 bg-purple-50 rounded">
                      <p className="text-xs text-gray-600">Qualidade</p>
                      <p className="text-sm font-bold text-purple-600">{container.sensors.airQuality}%</p>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setSelectedContainer(container.id)}
                  >
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ações Rápidas - Compacto */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-gray-900">Ações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button className="h-12 flex flex-col items-center justify-center space-y-0.5 bg-blue-600 hover:bg-blue-700">
                  <Bluetooth className="w-4 h-4" />
                  <span className="text-xs">Conectar</span>
                </Button>
                <Button variant="outline" className="h-12 flex flex-col items-center justify-center space-y-0.5">
                  <Settings className="w-4 h-4" />
                  <span className="text-xs">Config</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
}