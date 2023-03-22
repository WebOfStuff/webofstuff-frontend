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

  let message = { "where": req.query, "data": JSON.parse(req.body),"include": {userPersonas:true,userPersonas: {include: {persona: true}}}};
  let updateUser;
  updateUser = await prisma.user.update(message).then(response =>{
    if (response !== undefined) {
      return res.status(200).json(response)
    } else {
      return res.status(403).json(response)
    }
  })
}; 