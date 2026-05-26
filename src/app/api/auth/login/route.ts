import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/connection/mongoose";
import { UserModel } from "@/database/models/schemas";
import bcrypt from "bcryptjs";
import * as jose from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "rayanxweb_default_secret_key_64_bytes_secure");

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing identity payloads" }, { status: 400 });
    }

    const user = await UserModel.findOne({ email }).select("+passwordHash");
    if (!user || !user.isActive) {
      return NextResponse.json({ error: "Access denied: invalid token parameters" }, { status: 401 });
    }

    const matched = await bcrypt.compare(password, user.passwordHash);
    if (!matched) {
      return NextResponse.json({ error: "Access denied: invalid token parameters" }, { status: 401 });
    }

    const token = await new jose.SignJWT({ id: user._id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(SECRET);

    const res = NextResponse.json({
      status: "AUTHENTICATED",
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
      token
    });

    res.cookies.set("rayanx_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7200,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Internal operational matrix collapse" }, { status: 500 });
  }
}
