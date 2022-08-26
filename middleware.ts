import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  try {
    await jose.jwtVerify(
      req.cookies.get("token") as string,
      new TextEncoder().encode(process.env.JWT_SECRET_SEED)
    );
    return NextResponse.next();
  } catch (error) {
    const { protocol, host, pathname } = req.nextUrl;
    return NextResponse.redirect(
      `${protocol}//${host}/auth/login?page=${pathname}`
    );
  }
}

export const config = {
  matcher: ["/checkout/:path*"],
};
