export interface Feature {
  id: string;
  label: string;
  icon: string;
}

export interface CommandPayload {
  command: string;
  data?: any;
  pin: string;
  timestamp: number;
}
