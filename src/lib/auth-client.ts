import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const secret = new TextEncoder().encode(JWT_SECRET);

type TokenData = {
  userId: string;
  email: string;
};

export async function getTokenFromClientCookies(): Promise<TokenData | null> {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as TokenData;
  } catch (error) {
    console.log("Token verification failed on the client:", error);
    return null;
  }
}
