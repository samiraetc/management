// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      first_name?: string;
      last_name?: string;
      full_name?: string;
      username?: string;
      position?: string;
      email?: string;
      token?: string;
      workspaces?: { id: string; name: string; url_key: string }[];
    };
  }
}
