import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deviceService } from "@/services/deviceService";

export const useDevices = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["devices-list", page, limit],
    queryFn: () => deviceService.getDevices(page, limit),
    placeholderData: (previousData) => previousData, // Smooth UI transition anti-flicker
    staleTime: 5000, // Sinkronisasi ulang data dasar setiap 5 detik
  });
};

export const useDeviceControl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deviceId, command, payload }: { deviceId: string; command: string; payload?: any }) =>
      deviceService.dispatchControl(deviceId, command, payload),
    onSuccess: () => {
      // Invalidate cache agar UI langsung meminta data termutakhir dari MongoDB
      queryClient.invalidateQueries({ queryKey: ["devices-list"] });
    }
  });
};
