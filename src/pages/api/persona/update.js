import { PrismaClient } from "@prisma/client"
import { ifError } from "assert"

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
  
  try {
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
} catch (error) {
  res.status(403).message(error)
}

  let message = { "where": req.query, "data": JSON.parse(req.body),"include": {theme:true}};
  let updatePersona;
  updatePersona = await prisma.persona.update(message).then(response =>{
    if (response !== undefined) {
      res.status(200).json(response)
    } else {
      res.status(403).json(response)
    }
  })
}; 