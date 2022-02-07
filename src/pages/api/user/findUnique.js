import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react";

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

  let payload = JSON.parse(req.body)
  //  let {where, include} = req.body
  const user = await prisma.user.findUnique(payload)
  if (user.id !== undefined) {
    res.status(200).json({user: user})
  } else {
    res.status(403).json(prisma.status)
  }
}; 