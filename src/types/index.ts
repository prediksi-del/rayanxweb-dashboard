export interface TargetDevice {
  deviceId: string;
  model: string;
  connectedAt: number;
}

export interface NetworkLog {
  timestamp: string;
  type: 'INFO' | 'CMD' | 'WARN';
  message: string;
}
