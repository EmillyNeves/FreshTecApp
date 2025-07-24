import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Truck, CheckCircle, AlertCircle } from "lucide-react";

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());

  const events = [
    { date: new Date(2024, 0, 15), title: "Inspeção Semanal", type: "inspection", icon: CheckCircle },
    { date: new Date(2024, 0, 22), title: "Entrega de Produtos", type: "delivery", icon: Truck },
    { date: new Date(2024, 0, 29), title: "Manutenção de Equipamentos", type: "maintenance", icon: AlertCircle },
  ];

  const upcomingEvents = [
    { id: 1, title: "Entrega de Produtos Frescos", date: "Hoje, 14:00", type: "delivery", color: "bg-amber-500" },
    { id: 2, title: "Inspeção de Câmara Fria", date: "Amanhã, 09:00", type: "inspection", color: "bg-blue-500" },
    { id: 3, title: "Reunião com Fornecedor", date: "20 Jan, 10:30", type: "meeting", color: "bg-purple-500" },
    { id: 4, title: "Manutenção de Equipamentos", date: "25 Jan, 15:00", type: "maintenance", color: "bg-red-500" },
  ];

  return (
    <Layout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2 flex items-center">
            <CalendarIcon className="w-6 h-6 text-primary mr-3" />
            Agenda de Entregas
          </h2>
          <p className="text-neutral-600">Planeje e acompanhe seus eventos de estoque</p>
        </div>

        {/* Calendar */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border-0"
            />
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-neutral-600">Hoje</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm text-neutral-600">Entrega</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-sm text-neutral-600">Inspeção</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-800">{event.title}</h4>
                  <p className="text-sm text-neutral-600">{event.date}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {event.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Schedule */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Agendamento Rápido</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Agendar Entrega
            </button>
            <button className="p-4 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors">
              Planejar Inspeção
            </button>
            <button className="p-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors">
              Definir Lembrete
            </button>
            <button className="p-4 bg-neutral-600 text-white rounded-lg font-medium hover:bg-neutral-700 transition-colors">
              Ver Relatórios
            </button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
