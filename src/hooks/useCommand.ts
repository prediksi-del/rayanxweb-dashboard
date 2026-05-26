import { socket } from '@/lib/socket-client';
import { useDashboardStore } from '@/store/useDashboardStore';

export const useCommand = () => {
  const { pin } = useDashboardStore();

  const send = (command: string, data?: any) => {
    if (!pin) return alert('Sesi berakhir, silakan login ulang');
    socket.emit('admin_command', { command, data, pin, timestamp: Date.now() });
  };

  return { send };
};
