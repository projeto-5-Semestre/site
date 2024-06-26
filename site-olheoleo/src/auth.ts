import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export interface User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  password: string;
  veiculos?: any[];
}

export interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    password: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    password: string;
  };
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        const url = 'http://localhost:3000/usuarios';
        try {
          const response = await axios.get(url, {
            params: {
              email,
              password,
            }
          });

          const users = response.data;
          const user = users.find((user: any) => user.email === email && user.password === password);

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during authorization', error);
          return null;
        }
      },
    })
  ],
  pages: {
    signIn: "/TelaLogin",
    signOut: "/TelaLogin",
    error: "/TelaLogin",
    verifyRequest: "/TelaLogin",
    newUser: "/TelaLogin",
  },
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        console.log('Session:', session);
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        console.log('JWT token:', token);
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

export const register = async (userData: User): Promise<RegisterResponse> => {
  const url = 'http://localhost:3000/usuarios';

  try {
    const cpfExistsResponse = await axios.get(url, {
      params: {
        cpf: userData.cpf,
      },
    });
    const cpfExists = cpfExistsResponse.data.length > 0;

    if (cpfExists) {
      return { success: false, user: undefined };
    }

    const emailExistsResponse = await axios.get(url, {
      params: {
        email: userData.email,
      },
    });
    const emailExists = emailExistsResponse.data.length > 0;

    if (emailExists) {
      return { success: false, user: undefined };
    }

    const telefoneExistsResponse = await axios.get(url, {
      params: {
        telefone: userData.telefone,
      },
    });
    const telefoneExists = telefoneExistsResponse.data.length > 0;

    if (telefoneExists) {
      return { success: false, user: undefined };
    }

    const response = await axios.post(url, userData);
    return { success: true, user: response.data };
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false };
  }
};
