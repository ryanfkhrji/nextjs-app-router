import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  return response;
}

export default withAuth(mainMiddleware, ["/dashboard", "/profile", "/login", "/register"]);