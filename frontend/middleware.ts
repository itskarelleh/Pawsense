import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    debug: true,
    publicRoutes: ["/"],
     afterAuth(auth, req) {
       if (!auth.userId && !auth.isPublicRoute) {
         const signInUrl = new URL("/sign-in", req.url);
         signInUrl.searchParams.set("redirect_url", req.url);
         return NextResponse.redirect(signInUrl);
       }
       return NextResponse.next();
     },
   });
   
   export const config = {
     matcher: ["/((?!.*\\..*|_next).*)", "/", "/dashboard", "/(api|trpc)(.*)"],
   };