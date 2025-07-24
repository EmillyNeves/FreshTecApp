import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Calendar as CalendarIcon, Truck, CheckCircle, AlertCircle, 
  Package, Sprout, Clock, MapPin, Users, Home, Settings, TrendingUp
} from "lucide-react";
import { Link, useLocation } from 'wouter';

export default function CalendarPage() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [date, setDate] = useState<Date>(new Date());

  // Diferentes dados baseados no tipo de usuário
  const getCalendarData = () => {
    switch (user?.role) {
      case 'producer':
        return {
          title: "Agenda de Produção",
          subtitle: "Planeje colheitas, tratamentos e inspeções",
          upcomingEvents: [
            { id: 1, title: "Colheita de Tomates - Lote A3", date: "Hoje, 06:00", type: "harvest", color: "bg-green-500", icon: Sprout },
            { id: 2, title: "Aplicação de Defensivos", date: "Amanhã, 08:00", type: "treatment", color: "bg-yellow-500", icon: AlertCircle },
            { id: 3, title: "Inspeção de Qualidade", date: "20 Jan, 14:00", type: "inspection", color: "bg-blue-500", icon: CheckCircle },
            { id: 4, title: "Preparação de Lotes para Envio", date: "22 Jan, 10:00", type: "preparation", color: "bg-purple-500", icon: Package }
          ],
          quickActions: [
            { label: "Agendar Colheita", color: "bg-green-600", icon: Sprout },
            { label: "Planejar Tratamento", color: "bg-yellow-600", icon: AlertCircle },
            { label: "Inspeção Sanitária", color: "bg-blue-600", icon: CheckCircle },
            { label: "Relatório ANVISA", color: "bg-purple-600", icon: Package }
          ]
        };
      case 'transporter':
        return {
          title: "Agenda de Transporte",
          subtitle: "Gerencie rotas, entregas e manutenção",
          upcomingEvents: [
            { id: 1, title: "Rota SP-RJ - Carga Refrigerada", date: "Hoje, 05:00", type: "delivery", color: "bg-blue-500", icon: Truck },
            { id: 2, title: "Manutenção Preventiva - Frota 03", date: "Amanhã, 09:00", type: "maintenance", color: "bg-red-500", icon: AlertCircle },
            { id: 3, title: "Coleta em Produtor - Campinas", date: "21 Jan, 07:30", type: "pickup", color: "bg-green-500", icon: MapPin },
            { id: 4, title: "Entrega Express - Zona Sul", date: "23 Jan, 13:00", type: "express", color: "bg-amber-500", icon: Clock }
          ],
          quickActions: [
            { label: "Nova Rota", color: "bg-blue-600", icon: Truck },
            { label: "Agendar Manutenção", color: "bg-red-600", icon: AlertCircle },
            { label: "Otimizar Trajeto", color: "bg-green-600", icon: MapPin },
            { label: "Entrega Expressa", color: "bg-amber-600", icon: Clock }
          ]
        };
      case 'retailer':
        return {
          title: "Agenda de Varejo",
          subtitle: "Controle recebimentos, promoções e estoque",
          upcomingEvents: [
            { id: 1, title: "Recebimento de Hortifrúti", date: "Hoje, 08:00", type: "receiving", color: "bg-green-500", icon: Package },
            { id: 2, title: "Inventário Semanal", date: "Amanhã, 19:00", type: "inventory", color: "bg-blue-500", icon: CheckCircle },
            { id: 3, title: "Promoção Frutas Vermelhas", date: "20 Jan, 06:00", type: "promotion", color: "bg-red-500", icon: AlertCircle },
            { id: 4, title: "Reunião com Fornecedores", date: "25 Jan, 14:00", type: "meeting", color: "bg-purple-500", icon: Users }
          ],
          quickActions: [
            { label: "Agendar Recebimento", color: "bg-green-600", icon: Package },
            { label: "Planejar Inventário", color: "bg-blue-600", icon: CheckCircle },
            { label: "Criar Promoção", color: "bg-red-600", icon: AlertCircle },
            { label: "Reunião Fornecedor", color: "bg-purple-600", icon: Users }
          ]
        };
      default: // consumer
        return {
          title: "Minha Agenda Alimentar",
          subtitle: "Organize compras, consumo e doações",
          upcomingEvents: [
            { id: 1, title: "Compras no Mercado", date: "Hoje, 16:00", type: "shopping", color: "bg-blue-500", icon: Package },
            { id: 2, title: "Vencimento: Iogurte Natural", date: "Amanhã", type: "expiring", color: "bg-yellow-500", icon: Clock },
            { id: 3, title: "Doação: Pães para Ação Social", date: "20 Jan, 10:00", type: "donation", color: "bg-green-500", icon: Users },
            { id: 4, title: "Limpeza do Pote Inteligente", date: "22 Jan", type: "maintenance", color: "bg-purple-500", icon: CheckCircle }
          ],
          quickActions: [
            { label: "Agendar Compras", color: "bg-blue-600", icon: Package },
            { label: "Lembrete Vencimento", color: "bg-yellow-600", icon: Clock },
            { label: "Programar Doação", color: "bg-green-600", icon: Users },
            { label: "Planar Refeições", color: "bg-purple-600", icon: CheckCircle }
          ]
        };
    }
  };

  const calendarData = getCalendarData();

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
          <CalendarIcon className="w-5 h-5" />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <CalendarIcon className="w-6 h-6 text-primary mr-3" />
              {calendarData.title}
            </h2>
            <p className="text-gray-600">{calendarData.subtitle}</p>
          </div>

          {/* Calendar */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border-0 w-full"
              />
              
              {/* Legend */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm text-gray-600">Hoje</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Eventos</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {calendarData.upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                  <div className={`w-10 h-10 rounded-full ${event.color} flex items-center justify-center`}>
                    <event.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {calendarData.quickActions.map((action, index) => (
                  <Button 
                    key={index}
                    className={`h-16 flex flex-col items-center justify-center space-y-1 ${action.color} hover:opacity-90 text-white`}
                  >
                    <action.icon className="w-5 h-5" />
                    <span className="text-sm text-center leading-tight">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Role-specific Additional Features */}
          {user?.role === 'producer' && (
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Sprout className="w-5 h-5 mr-2 text-green-600" />
                  Calendário Agrícola
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próximo plantio recomendado</span>
                  <span className="font-bold text-green-600">Alface - 5 dias</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Período de chuvas</span>
                  <span className="font-bold text-blue-600">15-20 Jan</span>
                </div>
              </CardContent>
            </Card>
          )}

          {user?.role === 'consumer' && (
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Impacto Comunitário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Próxima ação social</span>
                  <span className="font-bold text-purple-600">Sábado, 10h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Alimentos a vencer esta semana</span>
                  <span className="font-bold text-yellow-600">3 itens</span>
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