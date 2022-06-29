import { PrismaClient } from "@prisma/client"
import handlePrismaUpdate from "../../../lib/handlePrismaUpdates"

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
  res = await handlePrismaUpdate ("theme", req, res)
  return res
}; 