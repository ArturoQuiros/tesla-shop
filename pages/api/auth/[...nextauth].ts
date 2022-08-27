import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { ArchitectureOutlined } from "@mui/icons-material";
import { dbUsers } from "../../../database";

export default NextAuth({
  // Configure one or more authentication providers
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
    // ...add more providers here
  ],

  //*Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "credentials":
            break;

          case "oauth":
            token.user = user;
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
