import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const seedAdminUser = async () => {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin";

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    console.log("Admin user already exists, skipping seeding.");
    console.log(existingUser);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email: "admin@senswise.com",
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      age: 30,
    },
  });

  console.log("Admin user seeded successfully.");
};

seedAdminUser()
  .catch((e) => {
    console.error("Error seeding admin user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
