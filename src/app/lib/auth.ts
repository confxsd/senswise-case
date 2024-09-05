import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(user: { id: string; email: string }) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1w",
  });
}

export function setTokenCookie(token: string) {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export function getTokenFromCookies() {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
  const token = cookies().get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
