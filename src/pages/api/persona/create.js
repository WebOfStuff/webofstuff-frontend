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
  let body

  if (req.body !== undefined) {
    body = JSON.parse(req.body)
  } else {
    error = "no data"
  }

  let createPersona;
  createPersona = await prisma.persona.create(body).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }
    if (createPersona !== undefined) {
      res.status(200).json({ name: 'John Doe' })
    } else {
      res.status(403).json(prisma.status)
    }
  })
}; 