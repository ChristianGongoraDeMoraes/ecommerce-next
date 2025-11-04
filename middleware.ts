'use server'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const protectedRoutes = ["/market", "/cart", "/finalizar"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  //const cookie = (await cookies()).get("session")?.value;
  //const sessionDecoded = sessionStorage.getItem("token");
  const sessionDecoded = (await cookies()).get("token")?.value;
  if(sessionDecoded){
      //const session = await jwt.decode(sessionDecoded);
      

      if (isPublicRoute && sessionDecoded) {
        return NextResponse.redirect(new URL("/market", req.nextUrl));
      }
  }

  if (isProtectedRoute && !sessionDecoded) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  return NextResponse.next();
}