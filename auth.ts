import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";
import type { User } from "./src/app/lib/definitions";

// PostgreSQL Connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Fetch user from database
async function getUser(email: string): Promise<User | null> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

// Auth Options
export const authOptions = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Invalid credentials format");
          return null;
        }

        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);

        if (!user) {
          console.log("User not found");
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          console.log("Invalid password");
          return null;
        }

        return user;
      },
    }),
  ],
};

// NextAuth API Handler
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
