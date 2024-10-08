import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = userSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: hashedPassword,
        age: validatedData.age,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors.map((err) => err.message) },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 5;

  const age = searchParams.get("age")
    ? Number(searchParams.get("age"))
    : undefined;

  const skip = (page - 1) * pageSize;

  const where = age ? { age: { equals: age } } : {};

  const users = await prisma.user.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });

  const totalUsers = await prisma.user.count({ where });

  return NextResponse.json({
    users,
    totalUsers,
    page,
    pageSize,
  });
}
