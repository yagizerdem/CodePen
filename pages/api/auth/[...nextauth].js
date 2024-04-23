import { getUserByEmail } from "@/lib/db";
import { comparePassword } from "@/lib/passwordHelper";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { mail, password } = credentials;
        if (!mail || !password) return null;

        try {
          var user = await getUserByEmail(mail);
          if (!user) return null;
          const flag = await comparePassword(password, user.password);
          if (!flag) return null;
        } catch (err) {
          console.log(err);
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      // here we put session.useData and put inside it whatever you want to be in the session
      // here try to console.log(token) and see what it will have
      // sometimes the user get stored in token.uid.userData
      // sometimes the user data get stored in just token.uid
      session.userData = {
        role: token.uid.role,
        email: token.uid.email,
        password: token.uid.password,
        firstname: token.uid.firstname,
        lastname: token.uid.lastname,
        id: token.uid.id,
      };

      return session;
    },
  },
};
export default NextAuth(authOptions);
