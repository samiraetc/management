import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import api from '../../api';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await api.post(
            `${process.env.BACKEND_API}/login`,
            JSON.stringify(credentials),
          );

          if (response.status === 200 && response.data) {
            return response.data;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      const finalUrl = url.startsWith(baseUrl) ? url : baseUrl;
      return finalUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
