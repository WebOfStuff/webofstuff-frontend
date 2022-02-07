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
  let error, query, body
  
  if (req.query !== undefined) {
    query = req.query
  } else {
    error = "no query"
  }

  if (req.body !== undefined) {
    body = req.body
  } else {
    error = "no data"
  }

  let message = { "where": req.query, "data": JSON.parse(req.body)};
  let updatePersona;
  updatePersona = await prisma.persona.update(message).then(
    (updatePersona !== undefined)? res.status(200).json({ name: 'John Doe' }):res.status(403).json(prisma.status)
   )
}; 