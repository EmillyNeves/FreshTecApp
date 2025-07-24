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

export interface FoodItem {
  id: string;
  batchId: string;
  name: string;
  category: string;
  purchaseDate: Date;
  expirationDate: Date;
  freshnessLevel: 'high' | 'medium' | 'low';
  remainingDays: number;
  storageLocation?: string;
  consumerId: string;
}

export interface SmartContainer {
  id: string;
  name: string;
  consumerId: string;
  bluetoothId: string;
  contents: FoodItem[];
  lastSync: Date;
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