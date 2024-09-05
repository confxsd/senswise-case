import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken, setTokenCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  console.log(email, password);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken(user);
  setTokenCookie(token);

  return NextResponse.json({ message: "Login successful" });
}
