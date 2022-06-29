export default async function handlePrismaUpdate(objectName, req, res) {
  let error, query, updateBody
  if (req.query !== undefined) {
    query = req.query
  } else {
    error = "no query"
  }

  if (req.body !== undefined) {
    updateBody = req.body
  } else {
    error = "no data"
  }

  let message = {
    "where": req.query,
    "data": JSON.parse(updateBody)
  }
  
  let updateTheme;
  updateTheme = await prisma[objectName].update(message).then(response => {
    if (response !== undefined) {
      res.status(200).json(response)
    } else {
      res.status(403).json(response)
    }
  })
}