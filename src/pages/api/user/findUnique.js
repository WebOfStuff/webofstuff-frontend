import { PrismaClient } from "@prisma/client"

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
  let email = req.query.email
  let payload = {
    where: {
      email: email,
    },
    include: {
      userPersonas: {
        include: {
          persona: {
            include: {
              theme: true
            }
          }
        }
      }
    }
  }
  

  const user = await prisma.user.findUnique(payload).then(response => {
    if (response !== undefined) {
      res.status(200).json(response)
    } else {
      res.status(403).json(prisma.status)
    }
  })
}; 