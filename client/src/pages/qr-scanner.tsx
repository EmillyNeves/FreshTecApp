import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  QrCode, Camera, Leaf, MapPin, Thermometer, Droplets, Calendar, 
  Truck, ArrowLeft, CheckCircle, Factory, Package, Store, 
  User, Shield, Award, TreePine, Container, Clock, TrendingUp,
  Zap, Wifi, AlertTriangle, Home, Settings, Globe
} from "lucide-react";
import { Link, useLocation } from 'wouter';

interface FreshnessPassportData {
  id: string;
  qrCode: string;
  digitalSeal: {
    productName: string;
    variety: string;
    producer: {
      name: string;
      location: string;
      certifications: string[];
    };
    harvest: {
      date: string;
      method: string;
      weather: string;
    };
    treatments: Array<{
      type: string;
      date: string;
      substance?: string;
      organic: boolean;
    }>;
  };
  journey: Array<{
    stage: 'production' | 'processing' | 'transport' | 'storage' | 'retail' | 'consumer';
    timestamp: string;
    location: string;
    handler: string;
    conditions: {
      temperature: number;
      humidity: number;
      atmosphere?: string;
    };
    transportMethod?: string;
    notes?: string;
  }>;
  predictions: {
    optimalConsumption: string;
    spoilageRisk: 'low' | 'medium' | 'high';
    remainingShelfLife: number;
    qualityScore: number;
  };
  sustainability: {
    carbonFootprint: number;
    waterUsage: number;
    packaging: {
      type: string;
      recyclable: boolean;
      biodegradable: boolean;
    };
  };
  compliance: {
    anvisa: boolean;
    organic: boolean;
    fairTrade: boolean;
    other: string[];
  };
  blockchain: {
    hash: string;
    verified: boolean;
    lastUpdate: string;
  };
}

export default function QRScanner() {
  const [location] = useLocation();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<FreshnessPassportData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'journey' | 'sustainability' | 'blockchain'>('overview');

  // Dados completos do Passaporte do Frescor
  const mockPassportData: FreshnessPassportData = {
    id: "FT-T001-20250124",
    qrCode: "https://freshtec.app/passport/FT-T001-20250124",
    digitalSeal: {
      productName: "Tomates Orgânicos",
      variety: "Tomate Caqui",
      producer: {
        name: "Fazenda Verde Sustentável Ltda",
        location: "Ibiúna, São Paulo - Brasil",
        certifications: ["Orgânico ANVISA", "Fair Trade", "Carbono Neutro"]
      },
      harvest: {
        date: "22/01/2025 - 06:30",
        method: "Colheita manual seletiva",
        weather: "Ensolarado, 18°C, baixa umidade"
      },
      treatments: [
        { type: "Irrigação", date: "20/01/2025", organic: true },
        { type: "Fertilização", date: "15/01/2025", substance: "Composto orgânico", organic: true },
        { type: "Controle de pragas", date: "18/01/2025", substance: "Óleo de neem", organic: true }
      ]
    },
    journey: [
      {
        stage: 'production',
        timestamp: "22/01/2025 06:30",
        location: "Fazenda Verde - Setor A3, Ibiúna/SP",
        handler: "João Silva - Responsável Técnico",
        conditions: { temperature: 18, humidity: 65 },
        notes: "Colheita matinal, frutos no ponto ideal de maturação"
      },
      {
        stage: 'processing',
        timestamp: "22/01/2025 09:15",
        location: "Centro de Beneficiamento - Fazenda Verde",
        handler: "Maria Santos - Técnica em Alimentos",
        conditions: { temperature: 16, humidity: 70, atmosphere: "Controlada" },
        notes: "Lavagem, seleção e embalagem em atmosfera controlada"
      },
      {
        stage: 'transport',
        timestamp: "22/01/2025 14:00",
        location: "Transportadora FreshLog",
        handler: "Carlos Oliveira - Motorista Certificado",
        conditions: { temperature: 4, humidity: 85 },
        transportMethod: "Caminhão refrigerado",
        notes: "Transporte em cadeia fria contínua"
      },
      {
        stage: 'storage',
        timestamp: "23/01/2025 08:30",
        location: "Centro de Distribuição FreshMart - SP",
        handler: "Ana Costa - Supervisora de Qualidade",
        conditions: { temperature: 6, humidity: 80 },
        notes: "Armazenamento em câmara fria certificada"
      },
      {
        stage: 'retail',
        timestamp: "24/01/2025 07:00",
        location: "Supermercado Fresco - Vila Madalena",
        handler: "Pedro Mendes - Gerente de Hortifrúti",
        conditions: { temperature: 8, humidity: 75 },
        notes: "Exposição em balcão refrigerado, rotação FIFO"
      }
    ],
    predictions: {
      optimalConsumption: "27/01/2025",
      spoilageRisk: 'low',
      remainingShelfLife: 5,
      qualityScore: 92
    },
    sustainability: {
      carbonFootprint: 0.32, // kg CO2
      waterUsage: 12.5, // litros
      packaging: {
        type: "Embalagem biodegradável de fibra de coco",
        recyclable: true,
        biodegradable: true
      }
    },
    compliance: {
      anvisa: true,
      organic: true,
      fairTrade: true,
      other: ["ISO 14001", "GlobalGAP", "Rainforest Alliance"]
    },
    blockchain: {
      hash: "0x7b8f9a2e5c1d3f6a8b4e9c2a7f5b8d1e9c3a6f2b5d8e1c4a7b9f2e5c8d1a4b7e9",
      verified: true,
      lastUpdate: "24/01/2025 19:45"
    }
  };

  const handleStartScanning = () => {
    setIsScanning(true);
    // Simular processo de escaneamento
    setTimeout(() => {
      setIsScanning(false);
      setScannedData(mockPassportData);
    }, 2000);
  };

  const getSpoilageRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpoilageRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return 'Baixo Risco';
      case 'medium': return 'Risco Moderado';
      case 'high': return 'Alto Risco';
      default: return 'Desconhecido';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'production': return Factory;
      case 'processing': return Package;
      case 'transport': return Truck;
      case 'storage': return Container;
      case 'retail': return Store;
      case 'consumer': return User;
      default: return CheckCircle;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'production': return 'bg-green-100 text-green-600';
      case 'processing': return 'bg-blue-100 text-blue-600';
      case 'transport': return 'bg-purple-100 text-purple-600';
      case 'storage': return 'bg-orange-100 text-orange-600';
      case 'retail': return 'bg-pink-100 text-pink-600';
      case 'consumer': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStageName = (stage: string) => {
    switch (stage) {
      case 'production': return 'Produção';
      case 'processing': return 'Processamento';
      case 'transport': return 'Transporte';
      case 'storage': return 'Armazenamento';
      case 'retail': return 'Varejo';
      case 'consumer': return 'Consumidor';
      default: return stage;
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

  if (scannedData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mobile-container">
          <div className="p-4 space-y-6 pb-24">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => setScannedData(null)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-bold text-gray-800">Passaporte do Frescor</h1>
              <div className="ml-auto">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verificado
                </Badge>
              </div>
            </div>

            {/* Selo de Frescor Digital */}
            <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">{scannedData.digitalSeal.productName}</CardTitle>
                    <p className="text-sm text-gray-600">{scannedData.digitalSeal.variety}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`border ${getSpoilageRiskColor(scannedData.predictions.spoilageRisk)}`}>
                      {getSpoilageRiskText(scannedData.predictions.spoilageRisk)}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Qualidade: {scannedData.predictions.qualityScore}%</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Produtor</p>
                    <p className="font-medium">{scannedData.digitalSeal.producer.name}</p>
                    <p className="text-xs text-gray-500">{scannedData.digitalSeal.producer.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Colheita</p>
                    <p className="font-medium">{scannedData.digitalSeal.harvest.date}</p>
                    <p className="text-xs text-gray-500">{scannedData.digitalSeal.harvest.method}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vida Útil</p>
                    <p className="font-medium text-green-600">{scannedData.predictions.remainingShelfLife} dias</p>
                    <p className="text-xs text-gray-500">Consumir até {scannedData.predictions.optimalConsumption}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pegada Carbono</p>
                    <p className="font-medium text-blue-600">{scannedData.sustainability.carbonFootprint}kg CO2</p>
                    <p className="text-xs text-gray-500">{scannedData.sustainability.waterUsage}L água</p>
                  </div>
                </div>

                {/* Certificações */}
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Certificações</p>
                  <div className="flex flex-wrap gap-2">
                    {scannedData.digitalSeal.producer.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-white">
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Visão Geral
              </button>
              <button
                onClick={() => setActiveTab('journey')}
                className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                  activeTab === 'journey' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Jornada
              </button>
              <button
                onClick={() => setActiveTab('sustainability')}
                className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                  activeTab === 'sustainability' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Impacto
              </button>
              <button
                onClick={() => setActiveTab('blockchain')}
                className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                  activeTab === 'blockchain' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Blockchain
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Tratamentos Aplicados */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Leaf className="w-5 h-5 text-green-600 mr-2" />
                      Tratamentos Aplicados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {scannedData.digitalSeal.treatments.map((treatment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{treatment.type}</h4>
                          <p className="text-sm text-gray-600">{treatment.substance || 'Sem substância aplicada'}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={treatment.organic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {treatment.organic ? 'Orgânico' : 'Convencional'}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{treatment.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Condições de Colheita */}
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Thermometer className="w-5 h-5 text-blue-600 mr-2" />
                      Condições de Colheita
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Método</p>
                        <p className="font-medium">{scannedData.digitalSeal.harvest.method}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Clima</p>
                        <p className="font-medium">{scannedData.digitalSeal.harvest.weather}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'journey' && (
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="w-5 h-5 text-purple-600 mr-2" />
                    Jornada Completa da Cadeia de Suprimentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scannedData.journey.map((step, index) => {
                      const StageIcon = getStageIcon(step.stage);
                      return (
                        <div key={index} className="relative">
                          {index < scannedData.journey.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                          )}
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStageColor(step.stage)}`}>
                              <StageIcon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-gray-900">{getStageName(step.stage)}</h4>
                                <span className="text-sm text-gray-500">{step.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{step.location}</p>
                              <p className="text-sm text-gray-600 mb-2">{step.handler}</p>
                              {step.notes && (
                                <p className="text-xs text-gray-500 mb-2 italic">{step.notes}</p>
                              )}
                              <div className="flex items-center space-x-4 text-xs">
                                <div className="flex items-center space-x-1">
                                  <Thermometer className="w-3 h-3 text-blue-500" />
                                  <span>{step.conditions.temperature}°C</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Droplets className="w-3 h-3 text-green-500" />
                                  <span>{step.conditions.humidity}%</span>
                                </div>
                                {step.transportMethod && (
                                  <div className="flex items-center space-x-1">
                                    <Truck className="w-3 h-3 text-purple-500" />
                                    <span>{step.transportMethod}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'sustainability' && (
              <div className="space-y-4">
                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <TreePine className="w-5 h-5 text-green-600 mr-2" />
                      Impacto Ambiental
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <TreePine className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Pegada de Carbono</p>
                        <p className="text-2xl font-bold text-green-600">{scannedData.sustainability.carbonFootprint}</p>
                        <p className="text-xs text-gray-500">kg CO2</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Uso de Água</p>
                        <p className="text-2xl font-bold text-blue-600">{scannedData.sustainability.waterUsage}</p>
                        <p className="text-xs text-gray-500">litros</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Embalagem Sustentável</h4>
                      <p className="text-sm text-gray-600 mb-3">{scannedData.sustainability.packaging.type}</p>
                      <div className="flex space-x-2">
                        <Badge className={scannedData.sustainability.packaging.recyclable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {scannedData.sustainability.packaging.recyclable ? '♻️ Reciclável' : 'Não Reciclável'}
                        </Badge>
                        <Badge className={scannedData.sustainability.packaging.biodegradable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {scannedData.sustainability.packaging.biodegradable ? '🌱 Biodegradável' : 'Não Biodegradável'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      Certificações de Conformidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`p-3 rounded-lg flex items-center space-x-2 ${scannedData.compliance.anvisa ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                        {scannedData.compliance.anvisa ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-gray-400" />}
                        <span className="text-sm font-medium">ANVISA</span>
                      </div>
                      <div className={`p-3 rounded-lg flex items-center space-x-2 ${scannedData.compliance.organic ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                        {scannedData.compliance.organic ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-gray-400" />}
                        <span className="text-sm font-medium">Orgânico</span>
                      </div>
                      <div className={`p-3 rounded-lg flex items-center space-x-2 ${scannedData.compliance.fairTrade ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                        {scannedData.compliance.fairTrade ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-gray-400" />}
                        <span className="text-sm font-medium">Fair Trade</span>
                      </div>
                    </div>
                    {scannedData.compliance.other.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Outras Certificações</p>
                        <div className="flex flex-wrap gap-2">
                          {scannedData.compliance.other.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'blockchain' && (
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="w-5 h-5 text-purple-600 mr-2" />
                    Verificação Blockchain
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-800">Registro Verificado</h4>
                        <p className="text-sm text-green-600">Todas as informações foram validadas na blockchain</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Seguro
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Hash do Bloco</p>
                      <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">{scannedData.blockchain.hash}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium text-green-600">✓ Verificado</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Última Atualização</p>
                        <p className="font-medium">{scannedData.blockchain.lastUpdate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Garantias da Blockchain</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• Dados imutáveis e à prova de falsificação</li>
                      <li>• Rastreabilidade completa da cadeia de suprimentos</li>
                      <li>• Transparência e confiança para o consumidor</li>
                      <li>• Conformidade com regulamentações internacionais</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ações */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => setScannedData(null)}>
                <QrCode className="w-4 h-4 mr-2" />
                Escanear Outro
              </Button>
              <Link href="/smart-container">
                <Button className="w-full">
                  <Container className="w-4 h-4 mr-2" />
                  Adicionar ao Pote
                </Button>
              </Link>
            </div>
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
          <div className="flex items-center space-x-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Scanner QR - Selo de Frescor</h1>
          </div>

          {/* Scanner Area */}
          <Card className="border-0 shadow-sm bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square bg-gray-900 relative flex items-center justify-center">
                {isScanning ? (
                  <div className="text-center text-white">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Escaneando Selo de Frescor Digital...</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Camera className="w-16 h-16 mx-auto mb-4" />
                    <p>Posicione o QR code do Selo no centro</p>
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
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <QrCode className="w-5 h-5 text-primary mr-2" />
                Como Acessar o Passaporte do Frescor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <p className="text-sm text-gray-700">Localize o Selo de Frescor Digital na embalagem do produto</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <p className="text-sm text-gray-700">Aponte a câmera para o QR code mantendo distância de 10-15cm</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <p className="text-sm text-gray-700">Acesse o histórico completo da cadeia de suprimentos do alimento</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cycle Info */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Globe className="w-5 h-5 text-green-600 mr-2" />
                Ciclo de Acúmulo de Informações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <Factory className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-xs font-medium">Produtor</p>
                  <p className="text-xs text-gray-600">Origem e cultivo</p>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-medium">Transporte</p>
                  <p className="text-xs text-gray-600">Cadeia fria</p>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <Store className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs font-medium">Varejo</p>
                  <p className="text-xs text-gray-600">Ponto de venda</p>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg">
                  <Container className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <p className="text-xs font-medium">Pote Inteligente</p>
                  <p className="text-xs text-gray-600">Consumidor final</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleStartScanning} 
              disabled={isScanning}
              className="w-full h-14 text-lg bg-primary hover:bg-primary/90"
            >
              <QrCode className="w-6 h-6 mr-2" />
              {isScanning ? 'Escaneando...' : 'Iniciar Scanner do Selo'}
            </Button>

            <Button 
              variant="outline" 
              onClick={() => setScannedData(mockPassportData)}
              className="w-full"
            >
              Ver Exemplo do Passaporte do Frescor
            </Button>

            <Link href="/smart-container">
              <Button variant="outline" className="w-full">
                <Container className="w-4 h-4 mr-2" />
                Gerenciar Potes Inteligentes
              </Button>
            </Link>
          </div>
        </div>
        <BottomNavigation />
      </div>
    </div>
  );
}