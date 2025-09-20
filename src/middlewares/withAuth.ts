import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdminPage = ["/dashboard"];
const authPages = ["/login", "/register"];

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });
      if (!token && !authPages.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // jika sudah login, tidak boleh mengakses halaman login dan register
      if (token) {
        if (authPages.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        if (token?.role !== "admin" && onlyAdminPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }

    return middleware(req, next);
  };
}
