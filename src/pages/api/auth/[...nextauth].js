import NextAuth from 'next-auth'
import { getToken } from "next-auth/jwt"
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { v4 } from "uuid"
import { generatePlaylistName } from "../../../components/Playlist/Playlist"
import { chooseRandomTheme } from "../../../components/themes/ThemeContext"

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

const secret = process.env.NEXTAUTH_SECRET

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  secret: process.env.HASH_SECRET,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token, user }) {
      let getUserPersonaPayload = {
        where: {
          id: user.id
        },
        include: {
          personas: true
        }
      }
      let userData;
      const userPersonasResponse = await fetch(process.env.URL + 'api/user/findUnique', {
        method: 'POST',
        body: JSON.stringify(getUserPersonaPayload),
      }).then ((response) => {
        return response.json();
      }).then((data) => {
       userData = data;
      })

      if (userData.user.personas.length == 0) {
        let id = v4()
        user.currentPersona = "Main";
        // create Persona
        let payload = {
          id: id,
          name: "Main",
          currentPlaylist: generatePlaylistName(),
          currentTheme: chooseRandomTheme(),   // maybe should be current Theme instead?
          users: {
            connect:
              [{ id: user.id }],
          }
        }
        const newPersona = await fetch(process.env.URL + 'api/persona/create?id=' + id, {
          method: 'post',
          body: JSON.stringify({ data: payload }),
        })
        user.personas = { Main: payload };
      }
      session.user.currentPersona = user.currentPersona
      session.user.personas = user.personas;
      console.log(session);
      return session;
    },
  }
})
