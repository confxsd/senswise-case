import { decodeJwt } from "jose";

type TokenData = {
  userId: string;
  email: string;
};

export function getTokenFromClientCookies(): Promise<TokenData | null> {
  return new Promise((resolve) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return resolve(null);
    }

    try {
      const payload = decodeJwt(token);
      resolve(payload as TokenData);
    } catch (error) {
      console.log("Token decoding failed on the client:", error);
      resolve(null);
    }
  });
}
