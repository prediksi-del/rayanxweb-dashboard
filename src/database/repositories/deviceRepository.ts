import { connectDB } from "../connection/mongoose";
import { DeviceModel, IDevice } from "../models/schemas";

export class DeviceRepository {
  static async findById(deviceId: string): Promise<IDevice | null> {
    await connectDB();
    return DeviceModel.findOne({ deviceId }).lean();
  }

  static async updateStatus(deviceId: string, status: IDevice["status"], metrics?: Partial<IDevice>): Promise<IDevice | null> {
    await connectDB();
    return DeviceModel.findOneAndUpdate(
      { deviceId },
      { $set: { status, lastSeen: new Date(), ...metrics } },
      { new: true, upsert: true }
    );
  }

  static async getRealtimeMetricsAggregation() {
    await connectDB();
    return DeviceModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          online: { $sum: { $cond: [{ $eq: ["$status", "ONLINE"] }, 1, 0] } },
          offline: { $sum: { $cond: [{ $eq: ["$status", "OFFLINE"] }, 1, 0] } },
          compromised: { $sum: { $cond: [{ $eq: ["$status", "COMPROMISED"] }, 1, 0] } }
        }
      }
    ]);
  }

  static async getPaginatedDevices(page: number, limit: number) {
    await connectDB();
    const skip = (page - 1) * limit;
    const items = await DeviceModel.find().sort({ lastSeen: -1 }).skip(skip).limit(limit).lean();
    const total = await DeviceModel.countDocuments();
    return { items, total, page, pages: Math.ceil(total / limit) };
  }
}
