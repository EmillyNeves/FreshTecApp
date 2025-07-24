import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@shared/types";
import { 
  Thermometer, Droplets, Truck, AlertTriangle, Package, 
  QrCode, Leaf, Factory, Users, BarChart3, TreePine,
  MapPin, Calendar, Zap, CheckCircle, Home, TrendingUp, Settings, Store, Container
} from "lucide-react";
import { Link, useLocation } from 'wouter';

export default function HomePage() {
  const { user, isGuest, loginAsGuest } = useAuth();
  const [location] = useLocation();

  const RoleSwitcher = () => {
    if (!isGuest) return null;

    const roleOptions = [
      { value: 'producer', label: 'Produtor', icon: Leaf },
      { value: 'transporter', label: 'Transportador', icon: Truck },
      { value: 'retailer', label: 'Varejista', icon: Store },
      { value: 'consumer', label: 'Consumidor', icon: Users },
    ];

    return (
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-700 mb-3 text-center font-medium">Modo Demonstração - Trocar Interface:</p>
          <div className="grid grid-cols-2 gap-2">
            {roleOptions.map((option) => {
              const Icon = option.icon;
              const isActive = user?.role === option.value;
              return (
                <Button
                  key={option.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => loginAsGuest(option.value as UserRole)}
                  className={`text-xs px-3 py-2 h-10 transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-md border-primary' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link href="/">
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            location === '/' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-primary'
          }`}>
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Início</span>
          </button>
        </Link>
        
        <Link href="/analytics">
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            location === '/analytics' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-primary'
          }`}>
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs mt-1">Análises</span>
          </button>
        </Link>
        
        <Link href="/calendar">
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            location === '/calendar' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-primary'
          }`}>
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Agenda</span>
          </button>
        </Link>
        
        <Link href="/settings">
          <button className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            location === '/settings' ? 'text-primary bg-primary/10' : 'text-gray-600 hover:text-primary'
          }`}>
            <Settings className="w-5 h-5" />
            <span className="text-xs mt-1">Config</span>
          </button>
        </Link>
      </div>
    </div>
  );

  // Dashboard específico para Produtor
  const ProducerDashboard = () => (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Olá, {user?.name}!</h2>
        <p className="text-gray-600 mb-3">{user?.company}</p>
        <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1 text-sm font-medium">
          <Leaf className="w-3 h-3 mr-1" />
          Produtor
        </Badge>
      </div>

      {/* Métricas Essenciais - Compacto */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Lotes</p>
                <p className="text-xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Truck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Transporte</p>
                <p className="text-xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas - Simplificado */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
            Alertas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-red-50 rounded">
            <Thermometer className="w-4 h-4 text-red-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">Lote T001 - Temp. Alta</h4>
              <p className="text-xs text-neutral-600">28°C (limite: 25°C)</p>
            </div>
            <Badge variant="destructive" className="text-xs">Alto</Badge>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
            <Package className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">Lote A002 - Risco</h4>
              <p className="text-xs text-neutral-600">Deterioração em 72h</p>
            </div>
            <Badge variant="secondary" className="text-xs">Médio</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 flex flex-col items-center justify-center space-y-1">
          <BarChart3 className="w-5 h-5" />
          <span className="text-sm">Relatórios</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
          <QrCode className="w-5 h-5" />
          <span className="text-sm">Novo Lote</span>
        </Button>
      </div>
    </div>
  );

  // Dashboard específico para Transportador
  const TransporterDashboard = () => (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Olá, {user?.name}!</h2>
        <p className="text-gray-600 mb-3">{user?.company}</p>
        <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 text-sm font-medium">
          <Truck className="w-3 h-3 mr-1" />
          Transportador
        </Badge>
      </div>

      {/* Métricas Essenciais - Compacto */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Truck className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Rotas</p>
                <p className="text-xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Entregas</p>
                <p className="text-xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rotas - Simplificado */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <MapPin className="w-4 h-4 text-primary mr-2" />
            Rotas Prioritárias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded">
            <Truck className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">SP-001</h4>
              <p className="text-xs text-neutral-600">3 lotes perecíveis</p>
            </div>
            <Badge className="bg-orange-100 text-orange-800 text-xs">Urgente</Badge>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
            <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">RJ-003</h4>
              <p className="text-xs text-neutral-600">5 lotes normais</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 text-xs">Normal</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Dashboard específico para Varejista
  const RetailerDashboard = () => (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Olá, {user?.name}!</h2>
        <p className="text-gray-600 mb-3">{user?.company}</p>
        <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1 text-sm font-medium">
          <Store className="w-3 h-3 mr-1" />
          Varejista
        </Badge>
      </div>

      {/* Métricas de Estoque - Layout otimizado */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Frescos</p>
                <p className="text-xl font-bold text-gray-900">847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Vencendo</p>
                <p className="text-xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Necessárias - Compacto */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
            Ações Urgentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-red-50 rounded">
            <Leaf className="w-4 h-4 text-red-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">Alface Americana</h4>
              <p className="text-xs text-neutral-600">15 un. • 1 dia</p>
            </div>
            <Badge variant="destructive" className="text-xs">Urgente</Badge>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
            <Leaf className="w-4 h-4 text-yellow-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">Tomates Cereja</h4>
              <p className="text-xs text-neutral-600">8 un. • 2 dias</p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800 text-xs">Atenção</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Dashboard específico para Consumidor
  const ConsumerDashboard = () => (
    <div className="p-4 space-y-6 pb-24">
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Olá, {user?.name}!</h2>
        <p className="text-gray-600 mb-3">Bem-vindo ao FreshTec</p>
        <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1 text-sm font-medium">
          <Users className="w-3 h-3 mr-1" />
          Consumidor
        </Badge>
      </div>

      {/* Ações Principais - Layout otimizado */}
      <div className="grid grid-cols-2 gap-2">
        <Link href="/qr-scanner">
          <Button className="h-20 w-full flex flex-col items-center justify-center space-y-1 bg-primary hover:bg-primary/90 shadow-sm">
            <QrCode className="w-6 h-6" />
            <span className="font-medium text-sm">Escanear QR</span>
          </Button>
        </Link>
        <Link href="/smart-container">
          <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center space-y-1 border border-gray-200 hover:bg-gray-50 shadow-sm">
            <Package className="w-6 h-6" />
            <span className="font-medium text-sm">Pote Inteligente</span>
          </Button>
        </Link>
      </div>

      {/* Meus Alimentos - Compacto */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <Leaf className="w-4 h-4 text-green-500 mr-2" />
            Meus Alimentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">Tomates Orgânicos</h4>
              <p className="text-xs text-neutral-600">5 dias restantes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
            <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">Alface Americana</h4>
              <p className="text-xs text-neutral-600">2 dias restantes</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-red-50 rounded">
            <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-800 truncate">Bananas</h4>
              <p className="text-xs text-neutral-600">1 dia restante</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impacto Sustentável - Simplificado */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <TreePine className="w-4 h-4 text-green-500 mr-2" />
            Impacto Sustentável
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-green-50 rounded">
              <p className="text-lg font-bold text-green-600">2.4kg</p>
              <p className="text-xs text-neutral-600">Desperdício evitado</p>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded">
              <p className="text-lg font-bold text-blue-600">1.8kg</p>
              <p className="text-xs text-neutral-600">CO2 economizado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboard = () => {
    switch (user?.role) {
      case 'producer':
        return <ProducerDashboard />;
      case 'transporter':
        return <TransporterDashboard />;
      case 'retailer':
        return <RetailerDashboard />;
      case 'consumer':
        return <ConsumerDashboard />;
      default:
        return <ConsumerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mobile-container">
        <RoleSwitcher />
        {renderDashboard()}
        <BottomNavigation />
      </div>
    </div>
  );
}