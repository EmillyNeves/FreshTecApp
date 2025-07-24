export type UserRole = 'producer' | 'transporter' | 'retailer' | 'consumer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  createdAt: Date;
}

export interface SensorData {
  temperature: number;
  humidity: number;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface Batch {
  id: string;
  producerId: string;
  productName: string;
  origin: string;
  destination?: string;
  status: 'in_production' | 'in_transit' | 'at_retailer' | 'consumed';
  sensorData: SensorData[];
  qrCode: string;
  carbonFootprint: number;
  predictedSpoilageRisk: 'low' | 'medium' | 'high';
  complianceStatus: 'compliant' | 'warning' | 'non_compliant';
  createdAt: Date;
  updatedAt: Date;
}

export interface FreshnessPassport {
  id: string;
  qrCode: string;
  digitalSeal: {
    productName: string;
    variety?: string;
    producer: {
      name: string;
      location: string;
      certifications: string[];
    };
    harvest: {
      date: Date;
      method: string;
      weather: string;
    };
    treatments: Array<{
      type: string;
      date: Date;
      substance?: string;
      organic: boolean;
    }>;
  };
  journey: Array<{
    stage: 'production' | 'processing' | 'transport' | 'storage' | 'retail' | 'consumer';
    timestamp: Date;
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
    optimalConsumption: Date;
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
    lastUpdate: Date;
  };
}

export interface FoodItem {
  id: string;
  passportId: string;
  name: string;
  category: string;
  purchaseDate: Date;
  expirationDate: Date;
  freshnessLevel: 'high' | 'medium' | 'low';
  remainingDays: number;
  storageLocation?: string;
  consumerId: string;
  smartContainerId?: string;
  consumptionHistory?: Array<{
    date: Date;
    amount: number;
    notes?: string;
  }>;
}

export interface SmartContainer {
  id: string;
  name: string;
  consumerId: string;
  bluetoothId: string;
  contents: FoodItem[];
  sensors: {
    temperature: number;
    humidity: number;
    airQuality: number;
    light: number;
  };
  settings: {
    optimalTemp: number;
    optimalHumidity: number;
    alertsEnabled: boolean;
    autoOptimize: boolean;
  };
  alerts: Array<{
    type: 'temperature' | 'humidity' | 'expiration' | 'contamination';
    severity: 'low' | 'medium' | 'high';
    message: string;
    timestamp: Date;
    resolved: boolean;
  }>;
  lastSync: Date;
  batteryLevel: number;
  firmwareVersion: string;
}

export interface Alert {
  id: string;
  type: 'temperature' | 'humidity' | 'expiration' | 'compliance';
  severity: 'low' | 'medium' | 'high';
  message: string;
  batchId?: string;
  foodItemId?: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface WasteReduction {
  userId: string;
  period: 'week' | 'month' | 'year';
  wasteAvoided: number; // kg
  co2Saved: number; // kg
  moneyWasted: number; // R$
}

export interface DonationPoint {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  acceptedItems: string[];
  contactInfo: string;
}