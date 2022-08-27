import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

export default NextAuth({
  //*Providers
  providers: [
    CredentialsProvider({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "youremail@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return await dbUsers.checkCredentials(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  //*Custom pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  //*session
  session: {
    maxAge: 86400 * 30,
    strategy: "jwt",
    updateAge: 86400,
  },

  //*Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "credentials":
            token.user = user;
            break;

          case "oauth":
            token.user = await dbUsers.oAuthDbUser(
              user?.email || "",
              user?.name || ""
            );

            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
});
