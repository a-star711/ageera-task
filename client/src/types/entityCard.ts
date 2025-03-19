export interface EntityCardProps {
  entityType: string;
  power?: number;
  energy?: number;
  capacity?: number;
  status?: string;
  irradiance?: number;
  runHours?: number;
  powerFactor?: number;
  voltage?: number;
  onClick?: () => void;
}