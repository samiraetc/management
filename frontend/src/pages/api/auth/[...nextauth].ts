import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from '../api';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
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
});
