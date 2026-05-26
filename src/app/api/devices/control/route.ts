import { NextRequest, NextResponse } from "next/server";
import { adminMessaging } from "@/lib/firebase-admin";
import { connectDB } from "@/database/connection/mongoose";
import { AuditLogModel } from "@/database/models/schemas";
import z from "zod";

const controlSchema = z.object({
  deviceId: z.string(),
  command: z.enum(["TOGGLE_FLASHLIGHT", "LOCK_SCREEN", "WIPE_DATA", "PUSH_NOTIFICATION"]),
  payload: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Zod Validation Schema
    const parsed = controlSchema.parse(body);

    // Kirim instruksi realtime ke perangkat gawai target menggunakan Firebase Cloud Messaging (FCM)
    const messagePayload = {
      topic: `device_${parsed.deviceId}`,
      data: {
        action: parsed.command,
        payload: JSON.stringify(parsed.payload || {}),
        emittedAt: new Date().toISOString(),
      },
      android: {
        priority: "high" as const,
      }
    };

    const fcmMessageId = await adminMessaging.send(messagePayload);

    // Catat ke Audit Log MongoDB untuk keperluan tracking kepatuhan siber (Compliance)
    await AuditLogModel.create({
      userId: "SYSTEM_GATEWAY", // Ambil dari session token asli di skenario nyata
      action: parsed.command,
      module: "DEVICE_MANAGEMENT",
      ipAddress: req.headers.get("x-forwarded-for") || "127.0.0.1",
      payload: JSON.stringify(parsed.payload),
    });

    return NextResponse.json({ status: "COMMAND_DISPATCHED", fcmMessageId });
  } catch (error: any) {
    return NextResponse.json({ error: error.errors || error.message }, { status: 400 });
  }
}
