import { prisma } from "@/lib/prisma";
import { userSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as Blob;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 },
      );
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Excel file is empty" },
        { status: 400 },
      );
    }

    const usersToInsert = [];
    const errors: string[] = [];
    let rowIndex = 1;

    for (const row of rows) {
      try {
        const parsedUser = userSchema.parse({
          firstName: row.firstName,
          lastName: row.lastName,
          email: row.email,
          age: Number(row.age),
          password: row.password,
        });

        const existingUser = await prisma.user.findUnique({
          where: { email: parsedUser.email },
        });

        if (existingUser) {
          errors.push(
            `Duplicate email found at row ${rowIndex}: ${parsedUser.email}`,
          );
        } else {
          usersToInsert.push({
            firstName: parsedUser.firstName,
            lastName: parsedUser.lastName,
            email: parsedUser.email,
            age: parsedUser.age,
            password: await bcrypt.hash(parsedUser.password, 10),
          });
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          errors.push(
            `Validation error at row ${rowIndex}: ${error.errors.map((e) => e.message).join(" ")}`,
          );
        }
      }
      rowIndex++;
    }

    if (errors.length > 0) {
      return NextResponse.json({ message: errors.join(", ") }, { status: 400 });
    }

    if (usersToInsert.length > 0) {
      await prisma.user.createMany({
        data: usersToInsert,
      });
    }

    return NextResponse.json(
      { message: "Users uploaded successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing the file:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
