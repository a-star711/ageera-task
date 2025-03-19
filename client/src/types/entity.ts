export interface Entity {
  id: number;
  power?: number;
  dailyEnergy?: number;
  capacity?: number;
  status?: string;
  entityType: string;
  powerFactor: number;
  runHours: number;
}
