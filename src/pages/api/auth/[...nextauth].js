import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { v4 } from "uuid"
/* import { generatePlaylistName } from "../../../components/Playlist/Playlist"
import { chooseRandomTheme } from "../../../components/themes/ThemeContext"
import { createNewPersona } from "../../../components/personas/PersonaChanger" */

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

//TODO: set random User name


      let getUserPersonaPayload = {
        where: {
          id: user.id
        },
        include: {
          userPersonas: true,
          userPersonas: {
            include: {
              persona: {
                include: {
                  theme: true
                }
              }
            },
          }
        }
      }
      let personaData;
      const userPersonasResponse = await fetch(process.env.URL + 'api/user/findUnique', {
        method: 'POST',
        body: JSON.stringify(getUserPersonaPayload),
      }).then((response) => {
        return response.json();
      }).then((data) => {
        personaData = data;
      })

      if (personaData.user.userPersonas.length == 0) {
        let generatedPersonaId = v4()
        //let {payload, newPersona} = createNewPersona(user.id, generatedPersonaId, "Main "+generatedPersonaId, generatePlaylistName() , chooseRandomTheme(), "System")
        user.userPersonas = { Main: payload };
        user.currentPersona = 0
      }

      session.user.id = user.id
      session.user.currentPersona = user.currentPersona
      session.user.userPersonas = personaData.user.userPersonas;
      console.log(session);
      return session;
    },
  }
})

function status(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
}
