import dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
}

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

export default nextConfig;
