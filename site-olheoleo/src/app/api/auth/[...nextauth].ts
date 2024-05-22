import NextAuth from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.get('http://localhost:3000/usuarios', {
            params: {
              email: credentials?.email,
              senha: credentials?.password,
            }
          });
          const users = response.data;
          const user = users.find((user: any) => user.email === credentials?.email && user.senha === credentials?.password);

          if (user) {
            return { id: user.id, name: user.nome, email: user.email };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during login:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
