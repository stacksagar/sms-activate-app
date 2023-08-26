import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/mongodb/User";
import error_message from "@/lib/error_message";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, _req) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return;

        try {
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user?.password);

          if (!passwordsMatch) {
            throw new Error("Invalid credentials!");
          }

          return user?._doc as any;
        } catch (error) {
          return error_message(error);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      let newData: any = {
        ...token,
        ...user,
        password: "",
        __v: "",
      };
      delete newData.password;
      delete newData.__v;
      return newData;
    },

    async session({ session, token }) {
      return { ...session, user: token };
    },
  },
};

export default NextAuth(authOptions);
