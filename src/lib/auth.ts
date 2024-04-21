import NextAuth from "next-auth";
import { encode, decode } from "next-auth/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import { db } from "src/server/db";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      authorize: async (credentials) => {
        // normally you would check the password against
        // a hashed version in the database, but for this
        // if you use email pass in prod, please do that

        const user = await db
          .select()
          .from(users)
          .where(
            and(
              eq(users.email, credentials.email as string),
              eq(users.password, credentials.password as string),
            ),
          );

        if (user.length === 0) {
          return null;
        }

        return user[0] ?? null;
      },
    }),
  ],
});
