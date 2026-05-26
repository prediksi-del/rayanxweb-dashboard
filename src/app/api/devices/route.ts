import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/connection/mongoose";
import { DeviceModel } from "@/database/models/schemas";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function authenticate(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) throw new Error("Unauthorized");
  const token = authHeader.split(" ")[1];
  return await jose.jwtVerify(token, SECRET);
}

export async function GET(req: NextRequest) {
  try {
    await authenticate(req);
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Aggregation Pipeline untuk performa query optimal skala Enterprise
    const devicesData = await DeviceModel.aggregate([
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $sort: { lastSeen: -1 } },
            { $skip: skip },
            { $limit: limit }
          ]
        }
      }
    ]);

    const items = devicesData[0].data;
    const total = devicesData[0].metadata[0]?.total || 0;

    return NextResponse.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 401 });
  }
}
