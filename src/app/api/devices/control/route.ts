import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/connection/mongoose";
import { DeviceModel } from "@/database/models/schemas";
import { generateSecureDeviceToken } from "@/utils/uuidGenerator";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Proteksi Sesi Jaringan Internal via JWT Validation
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Access denied: Missing cryptographic handshake" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    await jose.jwtVerify(token, SECRET);

    const body = await req.json();
    const { name, osVersion, ipAddress } = body;

    // Menghasilkan ID unik gawai menggunakan engine UUID v11 ESM yang baru direfaktur
    const secureDeviceId = generateSecureDeviceToken();

    const newDevice = await DeviceModel.create({
      deviceId: secureDeviceId,
      name,
      osVersion,
      status: "ONLINE",
      ipAddress: ipAddress || "127.0.0.1",
      lastSeen: new Date(),
    });

    return NextResponse.json({
      status: "SUCCESS_ENROLLED",
      node: {
        id: newDevice.deviceId,
        name: newDevice.name,
        status: newDevice.status
      }
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Matrix operation aborted" }, { status: 500 });
  }
}
