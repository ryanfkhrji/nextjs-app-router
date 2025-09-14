import { login } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface FirestoreUser {
  id: string;
  email: string;
  fullname?: string;
  role: string;
  password: string;
}

// Tipe return dari login()
interface LoginResult {
  status: boolean;
  statusCode: number;
  message: string;
  data?: FirestoreUser;
}

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      fullname?: string;
      role: string;
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    fullname?: string;
    role?: string;
    id?: string;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "12345678",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
      },
      async authorize(credentials): Promise<FirestoreUser | null> {
        if (!credentials?.email || !credentials.password) return null;

        const result: LoginResult = await login({ email: credentials.email });
        if (!result.status || !result.data) return null;

        const user = result.data;

        if (!user.password) return null;

        const passwordMatch = await compare(credentials.password, user.password);
        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email as string || "";
        token.fullname = (user as FirestoreUser)?.fullname || "";
        token.role = (user as FirestoreUser).role || "";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email || "";
        session.user.fullname = token.fullname;
        session.user.role = token.role || "";
        session.user.id = token.id || "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
