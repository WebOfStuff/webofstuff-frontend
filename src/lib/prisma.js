import { PrismaClient } from '@prisma/client';

export const prisma = createPrisma()

function createPrisma() {
  console.error ("new Prisma")
  let prisma = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      "info",
      "warn",
      "error",
    ],
  });
  prisma.$on("query", e => {
    //console.log("Query: " + e.query);
    //console.log("Duration: " + e.duration + "ms");
  });
  return prisma
}

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;