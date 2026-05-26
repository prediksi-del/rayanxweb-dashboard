import { v4 as uuidv4, v5 as uuidv5 } from "uuid";

const NAMESPACE_RAYANX = "6ba7b810-9bad-11cf-8041-00805f544e5b"; // Standard UUID DNS Namespace

/**
 * Menghasilkan token UUID v4 acak kriptografis untuk ID perangkat baru.
 */
export const generateSecureDeviceToken = (): string => {
  return uuidv4();
};

/**
 * Menghasilkan UUID v5 deterministik berdasarkan string identitas gawai yang unik.
 */
export const generateDeterministicNodeId = (hardwareSerial: string): string => {
  return uuidv5(hardwareSerial, NAMESPACE_RAYANX);
};
