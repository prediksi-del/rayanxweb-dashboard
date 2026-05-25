import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Endpoint fallback jika Anda ingin memicu trigger via HTTP Post REST request
    return NextResponse.json({ 
      success: true, 
      status: "Piped to REST pool", 
      received: body 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, reason: "Malformed body structural definition" }, { status: 400 });
  }
}
