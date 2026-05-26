import { api } from "@/lib/axios";

export interface DeviceResponse {
  items: any[];
  total: number;
  page: number;
  pages: number;
}

export const deviceService = {
  getDevices: async (page = 1, limit = 10): Promise<DeviceResponse> => {
    const { data } = await api.get<DeviceResponse>(`/devices?page=${page}&limit=${limit}`);
    return data;
  },

  dispatchControl: async (deviceId: string, command: string, payload = {}) => {
    const { data } = await api.post("/devices/control", { deviceId, command, payload });
    return data;
  }
};
