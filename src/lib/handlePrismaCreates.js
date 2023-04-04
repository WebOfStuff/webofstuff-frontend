
export default async function handlePrismaCreate(objectName, req, res) {
  let body
  if (req.body !== undefined) {
    body = JSON.parse(req.body)
  } else {
    error = "no data"
  }
  await prisma[objectName].create(body).then(response => {
    if (response !== undefined) {
      res.status(200).json(response)
    } else {
      res.status(403).json(response)
    }
    return res
  })
}