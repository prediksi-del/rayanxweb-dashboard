import mongoose, { Schema, Document } from "mongoose";

// --- USER SCHEMA ---
export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: "SUPERADMIN" | "ADMIN" | "OPERATOR" | "AUDITOR";
  isActive: boolean;
  otpSecret?: string;
  isOtpVerified: boolean;
}

export const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["SUPERADMIN", "ADMIN", "OPERATOR", "AUDITOR"], default: "OPERATOR", index: true },
  isActive: { type: Boolean, default: true },
  otpSecret: { type: String },
  isOtpVerified: { type: Boolean, default: false }
}, { timestamps: true });

// --- DEVICE SCHEMA ---
export interface IDevice extends Document {
  deviceId: string;
  name: string;
  osVersion: string;
  status: "ONLINE" | "OFFLINE" | "SUSPICIOUS" | "COMPROMISED";
  batteryLevel: number;
  ipAddress: string;
  isLocked: boolean;
  networkType: string;
  lastSeen: Date;
}

export const DeviceSchema = new Schema<IDevice>({
  deviceId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  osVersion: { type: String, required: true },
  status: { type: String, enum: ["ONLINE", "OFFLINE", "SUSPICIOUS", "COMPROMISED"], default: "OFFLINE", index: true },
  batteryLevel: { type: Number, default: 100 },
  ipAddress: { type: String, default: "0.0.0.0" },
  isLocked: { type: Boolean, default: false },
  networkType: { type: String, default: "WIFI" },
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

// --- SECURITY LOG SCHEMA ---
export interface ISecurityLog extends Document {
  deviceId: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  category: string;
  resolved: boolean;
}

export const SecurityLogSchema = new Schema<ISecurityLog>({
  deviceId: { type: String, required: true, index: true },
  severity: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"], required: true, index: true },
  message: { type: String, required: true },
  category: { type: String, required: true, index: true },
  resolved: { type: Boolean, default: false }
}, { timestamps: true });

// --- AUDIT LOG SCHEMA ---
export interface IAuditLog extends Document {
  userId: string;
  action: string;
  module: string;
  ipAddress: string;
  payload: string;
}

export const AuditLogSchema = new Schema<IAuditLog>({
  userId: { type: String, required: true, index: true },
  action: { type: String, required: true },
  module: { type: String, required: true, index: true },
  ipAddress: { type: String, required: true },
  payload: { type: String }
}, { timestamps: true });

// Compile Models
export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const DeviceModel = mongoose.models.Device || mongoose.model<IDevice>("Device", DeviceSchema);
export const SecurityLogModel = mongoose.models.SecurityLog || mongoose.model<ISecurityLog>("SecurityLog", SecurityLogSchema);
export const AuditLogModel = mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
