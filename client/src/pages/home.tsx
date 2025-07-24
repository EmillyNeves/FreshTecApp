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

      {/* Métricas de Produção */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Lotes Ativos</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Em Transporte</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <TreePine className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Pegada CO2</p>
                <p className="text-2xl font-bold text-gray-900">2.4t</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Conformidade</p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Críticos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Alertas Críticos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <Thermometer className="w-5 h-5 text-red-600" />
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Lote #T001 - Temperatura Alta</h4>
              <p className="text-sm text-neutral-600">Tomates - 28°C (limite: 25°C)</p>
            </div>
            <Badge variant="destructive">Alto</Badge>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <Package className="w-5 h-5 text-yellow-600" />
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Lote #A002 - Risco de Deterioração</h4>
              <p className="text-sm text-neutral-600">Alface - Previsão: 72h</p>
            </div>
            <Badge variant="secondary">Médio</Badge>
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

      {/* Métricas de Transporte */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Rotas Ativas</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Entregas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TreePine className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">CO2 Economizado</p>
                <p className="text-2xl font-bold text-gray-900">1.2t</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Taxa Sucesso</p>
                <p className="text-2xl font-bold text-gray-900">96%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rotas Críticas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MapPin className="w-5 h-5 text-primary mr-2" />
            Rotas Prioritárias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Rota SP-001</h4>
              <p className="text-sm text-neutral-600">São Paulo → Santos • 3 lotes perecíveis</p>
            </div>
            <Badge className="bg-orange-100 text-orange-800">Urgente</Badge>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Rota RJ-003</h4>
              <p className="text-sm text-neutral-600">Rio de Janeiro → Niterói • 5 lotes</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Normal</Badge>
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

      {/* Métricas de Estoque */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Itens Frescos</p>
                <p className="text-2xl font-bold text-gray-900">847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Próx. Vencimento</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Vencidos</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Em Trânsito</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Produtos Críticos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Zap className="w-5 h-5 text-yellow-500 mr-2" />
            Ação Necessária
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Alface Americana</h4>
              <p className="text-sm text-neutral-600">15 unidades • Vence em 1 dia</p>
            </div>
            <Badge variant="destructive">Urgente</Badge>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Tomates Cereja</h4>
              <p className="text-sm text-neutral-600">8 unidades • Vence em 2 dias</p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">Atenção</Badge>
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

      {/* Scanner QR e Pote Inteligente */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/qr-scanner">
          <Button className="h-24 w-full flex flex-col items-center justify-center space-y-2 bg-primary hover:bg-primary/90 shadow-md">
            <QrCode className="w-8 h-8" />
            <span className="font-medium">Escanear QR</span>
          </Button>
        </Link>
        <Link href="/smart-container">
          <Button variant="outline" className="h-24 w-full flex flex-col items-center justify-center space-y-2 border-2 border-gray-200 hover:bg-gray-50 shadow-sm">
            <Package className="w-8 h-8" />
            <span className="font-medium">Pote Inteligente</span>
          </Button>
        </Link>
      </div>

      {/* Meus Alimentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Leaf className="w-5 h-5 text-green-500 mr-2" />
            Meus Alimentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Tomates Orgânicos</h4>
              <p className="text-sm text-neutral-600">Fresquinho • 5 dias restantes</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Alface Americana</h4>
              <p className="text-sm text-neutral-600">Consumir logo • 2 dias restantes</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">Bananas</h4>
              <p className="text-sm text-neutral-600">Consumir hoje • 1 dia restante</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
        </CardContent>
      </Card>

      {/* Impacto Ambiental */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TreePine className="w-5 h-5 text-green-500 mr-2" />
            Seu Impacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">2.4kg</p>
              <p className="text-sm text-neutral-600">Desperdício evitado</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">1.8kg</p>
              <p className="text-sm text-neutral-600">CO2 economizado</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compartilhamento Comunitário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Users className="w-5 h-5 text-purple-500 mr-2" />
            Compartilhamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div>
              <h4 className="font-medium text-neutral-800">Pontos de Doação</h4>
              <p className="text-sm text-neutral-600">3 locais próximos disponíveis</p>
            </div>
            <Button size="sm" variant="outline">Ver Mapa</Button>
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