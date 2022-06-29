import { PrismaClient } from "@prisma/client"
import handlePrismaCreate from "../../../lib/handlePrismaCreates"


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
  res = await handlePrismaCreate ("theme", req, res)
  return res
}; 