import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, Camera, Leaf, MapPin, Thermometer, 
  Droplets, Calendar, Truck, ArrowLeft, CheckCircle 
} from "lucide-react";
import { Link } from 'wouter';

interface BatchData {
  id: string;
  productName: string;
  producer: string;
  origin: string;
  harvestDate: string;
  currentLocation: string;
  freshnessLevel: string;
  remainingDays: number;
  journey: Array<{
    stage: string;
    date: string;
    location: string;
    temperature: string;
  }>;
  sensors: {
    temperature: number;
    humidity: number;
    lastUpdate: string;
  };
  carbonFootprint: number;
  compliance: string;
  tips: string[];
}

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<BatchData | null>(null);

  // Dados simulados de um lote escaneado
  const mockBatchData: BatchData = {
    id: "T001-20250124",
    productName: "Tomates Orgânicos",
    producer: "Fazenda Verde Ltda",
    origin: "Ibiúna, SP",
    harvestDate: "22/01/2025",
    currentLocation: "Supermercado Fresco - Vila Madalena",
    freshnessLevel: "high",
    remainingDays: 5,
    journey: [
      { stage: "Colheita", date: "22/01/2025", location: "Fazenda Verde - Ibiúna", temperature: "25°C" },
      { stage: "Transporte", date: "23/01/2025", location: "Em trânsito SP", temperature: "4°C" },
      { stage: "Chegada", date: "24/01/2025", location: "Supermercado Fresco", temperature: "6°C" },
    ],
    sensors: {
      temperature: 6,
      humidity: 85,
      lastUpdate: "há 2 horas"
    },
    carbonFootprint: 0.8, // kg CO2
    compliance: "Certificado ANVISA",
    tips: [
      "Armazene na geladeira entre 4-8°C",
      "Consuma preferencialmente em até 5 dias",
      "Ideal para saladas e pratos cozidos"
    ]
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    // Simular processo de escaneamento
    setTimeout(() => {
      setIsScanning(false);
      setScannedData(mockBatchData);
    }, 2000);
  };

  const getFreshnessColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFreshnessText = (level: string) => {
    switch (level) {
      case 'high': return 'Muito Fresco';
      case 'medium': return 'Moderadamente Fresco';
      case 'low': return 'Consumir Logo';
      default: return 'Desconhecido';
    }
  };

  if (scannedData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Passaporte do Frescor</h1>
          </div>

          {/* Produto Principal */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{scannedData.productName}</CardTitle>
                <Badge className={`border ${getFreshnessColor(scannedData.freshnessLevel)}`}>
                  {getFreshnessText(scannedData.freshnessLevel)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{scannedData.producer}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Origem</p>
                  <p className="font-medium">{scannedData.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Colheita</p>
                  <p className="font-medium">{scannedData.harvestDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dias Restantes</p>
                  <p className="font-medium text-green-600">{scannedData.remainingDays} dias</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CO2 Pegada</p>
                  <p className="font-medium">{scannedData.carbonFootprint}kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sensores Atuais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Thermometer className="w-5 h-5 text-blue-500 mr-2" />
                Condições Atuais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Temperatura</p>
                    <p className="font-bold text-blue-600">{scannedData.sensors.temperature}°C</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Umidade</p>
                    <p className="font-bold text-green-600">{scannedData.sensors.humidity}%</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Última atualização: {scannedData.sensors.lastUpdate}
              </p>
            </CardContent>
          </Card>

          {/* Jornada do Produto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="w-5 h-5 text-purple-500 mr-2" />
                Jornada do Produto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scannedData.journey.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">{step.stage}</h4>
                        <span className="text-sm text-gray-500">{step.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{step.location}</p>
                      <p className="text-xs text-blue-600">Temp: {step.temperature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dicas de Armazenamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Leaf className="w-5 h-5 text-green-500 mr-2" />
                Dicas de Armazenamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scannedData.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Conformidade */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Conformidade</h4>
                  <p className="text-sm text-green-600">{scannedData.compliance}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="grid grid-cols-2 gap-4 pb-6">
            <Button variant="outline" onClick={() => setScannedData(null)}>
              <QrCode className="w-4 h-4 mr-2" />
              Escanear Outro
            </Button>
            <Button>
              <Leaf className="w-4 h-4 mr-2" />
              Salvar Item
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Scanner QR</h1>
        </div>

        {/* Scanner Area */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="aspect-square bg-gray-900 relative flex items-center justify-center">
              {isScanning ? (
                <div className="text-center text-white">
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Escaneando...</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <p>Posicione o QR code no centro</p>
                </div>
              )}
              
              {/* Scanner Frame */}
              <div className="absolute inset-8 border-2 border-white rounded-lg opacity-50"></div>
              <div className="absolute top-8 left-8 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
              <div className="absolute top-8 right-8 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
              <div className="absolute bottom-8 left-8 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
              <div className="absolute bottom-8 right-8 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg"></div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <QrCode className="w-5 h-5 text-primary mr-2" />
              Como usar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <p className="text-sm text-gray-700">Aponte a câmera para o QR code do Selo de Frescor Digital</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <p className="text-sm text-gray-700">Mantenha o celular estável até o código ser lido</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <p className="text-sm text-gray-700">Veja todas as informações do Passaporte do Frescor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Scanning Button */}
        <Button 
          onClick={handleStartScanning} 
          disabled={isScanning}
          className="w-full h-14 text-lg"
        >
          <QrCode className="w-6 h-6 mr-2" />
          {isScanning ? 'Escaneando...' : 'Iniciar Scanner'}
        </Button>

        {/* Demo Button */}
        <Button 
          variant="outline" 
          onClick={() => setScannedData(mockBatchData)}
          className="w-full"
        >
          Ver Exemplo de Resultado
        </Button>
      </div>
    </div>
  );
}