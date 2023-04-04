import { PrismaClient } from "@prisma/client"
import handlePrismaUpsert from "../../../lib/handlePrismaUpsert"

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default async function handle(req, res) {
  res = await handlePrismaUpsert ("theme", req, res)
  return res
}; 