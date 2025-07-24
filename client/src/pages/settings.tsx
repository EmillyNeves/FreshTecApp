import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Bell, Sprout, Thermometer, Truck, Megaphone, BarChart3, 
  Globe, Palette, Database, Shield, Download, LogOut, ChevronRight,
  Home, Settings as SettingsIcon, Calendar, TrendingUp, User, Building,
  Smartphone, Wifi, Eye, Lock, HelpCircle
} from "lucide-react";
import { Link, useLocation } from 'wouter';

export default function Settings() {
  const { user, logout } = useAuth();
  const [location] = useLocation();
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

  // Configurações específicas por tipo de usuário
  const getRoleSpecificSettings = () => {
    switch (user?.role) {
      case 'producer':
        return {
          title: "Configurações do Produtor",
          subtitle: "Personalize seu painel de produção",
          specificSettings: [
            {
              icon: Sprout,
              title: "Alertas de Colheita",
              description: "Notificações sobre períodos ideais de colheita",
              enabled: true,
              color: "bg-green-100 text-green-600"
            },
            {
              icon: Thermometer,
              title: "Monitoramento de Solo",
              description: "Alertas sobre condições do solo e irrigação",
              enabled: false,
              color: "bg-blue-100 text-blue-600"
            },
            {
              icon: BarChart3,
              title: "Relatórios ANVISA",
              description: "Geração automática de relatórios de conformidade",
              enabled: true,
              color: "bg-purple-100 text-purple-600"
            }
          ],
          additionalOptions: [
            { label: "Certificações Orgânicas", value: "Ativo" },
            { label: "Integração com Cooperativa", value: "Conectado" },
            { label: "Previsão Meteorológica", value: "Habilitado" }
          ]
        };
      case 'transporter':
        return {
          title: "Configurações do Transportador",
          subtitle: "Otimize suas operações logísticas",
          specificSettings: [
            {
              icon: Truck,
              title: "Rastreamento de Frota",
              description: "Monitoramento em tempo real de veículos",
              enabled: true,
              color: "bg-blue-100 text-blue-600"
            },
            {
              icon: Thermometer,
              title: "Controle de Temperatura",
              description: "Alertas críticos de refrigeração",
              enabled: true,
              color: "bg-red-100 text-red-600"
            },
            {
              icon: BarChart3,
              title: "Otimização de Rotas",
              description: "Sugestões automáticas de melhores trajetos",
              enabled: false,
              color: "bg-green-100 text-green-600"
            }
          ],
          additionalOptions: [
            { label: "Manutenção Preventiva", value: "Agendada" },
            { label: "Combustível - Controle", value: "Ativo" },
            { label: "Seguro de Carga", value: "Vigente" }
          ]
        };
      case 'retailer':
        return {
          title: "Configurações do Varejista",
          subtitle: "Gerencie seu ponto de venda",
          specificSettings: [
            {
              icon: BarChart3,
              title: "Análise de Vendas",
              description: "Relatórios automáticos de performance",
              enabled: true,
              color: "bg-purple-100 text-purple-600"
            },
            {
              icon: Bell,
              title: "Alertas de Estoque",
              description: "Notificações sobre produtos próximos ao vencimento",
              enabled: true,
              color: "bg-yellow-100 text-yellow-600"
            },
            {
              icon: Megaphone,
              title: "Promoções Automáticas",
              description: "Criação automática de ofertas para produtos próximos ao vencimento",
              enabled: false,
              color: "bg-red-100 text-red-600"
            }
          ],
          additionalOptions: [
            { label: "Sistema PDV Integrado", value: "Conectado" },
            { label: "Programa Fidelidade", value: "Ativo" },
            { label: "Delivery Online", value: "Habilitado" }
          ]
        };
      default: // consumer
        return {
          title: "Configurações Pessoais",
          subtitle: "Personalize sua experiência",
          specificSettings: [
            {
              icon: Bell,
              title: "Lembretes de Vencimento",
              description: "Notificações sobre alimentos próximos ao vencimento",
              enabled: true,
              color: "bg-yellow-100 text-yellow-600"
            },
            {
              icon: Sprout,
              title: "Dicas de Sustentabilidade",
              description: "Sugestões para reduzir desperdício",
              enabled: true,
              color: "bg-green-100 text-green-600"
            },
            {
              icon: Megaphone,
              title: "Oportunidades de Doação",
              description: "Notificações sobre pontos de doação próximos",
              enabled: false,
              color: "bg-purple-100 text-purple-600"
            }
          ],
          additionalOptions: [
            { label: "Pote Inteligente Conectado", value: "2 dispositivos" },
            { label: "Ranking Comunidade", value: "#47" },
            { label: "Impacto Ambiental", value: "Médio" }
          ]
        };
    }
  };

  const roleSettings = getRoleSpecificSettings();

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
          <SettingsIcon className="w-5 h-5" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{roleSettings.title}</h2>
            <p className="text-gray-600">{roleSettings.subtitle}</p>
          </div>

          {/* User Profile */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">{user?.name || 'Usuário'}</h2>
                  <p className="text-gray-600">{user?.email || 'email@exemplo.com'}</p>
                  <Badge className="mt-1 bg-primary/10 text-primary hover:bg-primary/20">
                    {user?.role === 'producer' && 'Produtor'}
                    {user?.role === 'transporter' && 'Transportador'}
                    {user?.role === 'retailer' && 'Varejista'}
                    {user?.role === 'consumer' && 'Consumidor'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role-Specific Settings */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <SettingsIcon className="w-5 h-5 text-primary mr-3" />
                Configurações Específicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {roleSettings.specificSettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${setting.color}`}>
                      <setting.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{setting.title}</h4>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={(value) => console.log(`${setting.title}: ${value}`)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Additional Options */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Building className="w-5 h-5 text-primary mr-3" />
                Informações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {roleSettings.additionalOptions.map((option, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-600">{option.label}</span>
                  <Badge variant="outline" className="text-xs">
                    {option.value}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* General App Settings */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <Smartphone className="w-5 h-5 text-primary mr-3" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Idioma</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Português (BR)</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Palette className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Tema</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Claro</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Notificações</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Personalizar</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Privacidade e Segurança</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Dados e Backup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    1.2 GB
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <HelpCircle className="w-5 h-5 text-primary mr-3" />
                Ajuda e Suporte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Central de Ajuda</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Termos de Uso</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              <Download className="w-5 h-5 mr-2" />
              Exportar Dados
            </Button>
            
            <Button 
              onClick={logout}
              variant="destructive"
              className="w-full py-4 rounded-xl font-semibold"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair da Conta
            </Button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
}