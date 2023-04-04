import { Prisma } from '@prisma/client'


export default async function handlePrismaUpsert(objectName, req, res) {

  let body = JSON.parse(req.body)
  let message = {
    "where": body.where,
    "update": body.update,
    "create": body.create
  }

  try {
    await prisma[objectName].upsert(message).then((response) => {
      if (response !== undefined) {
        res.status(200).json(response)
      } else {
        res.status(403).json(response)
      }
    })
  } catch (e) {
 
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      console.log(e.code)
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    throw e
  }
}
