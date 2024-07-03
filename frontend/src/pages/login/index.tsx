import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [workspaceUrl, setWorkspaceUrl] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && session) {
      session?.user.workspaces?.length === 0
        ? router.push('/join')
        : router.push(
            `/${workspaceUrl ?? (session?.user.workspaces && session?.user.workspaces[0].url_key)}`,
          );
    }
  }, [status, router, session, workspaceUrl]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWorkspaceUrl(localStorage.getItem('workspace') ?? '');
    }
  }, []);

  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Email ou senha inválido');
    } else {
      setError(null);
    }
  };

  if (status === 'loading' || status === 'authenticated') {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 min-h-screen">
      <div className="flex justify-end px-7 sm:px-10 pt-5">
        <ModeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-80 flex-col justify-between gap-4 sm:w-1/3">
          <h1 className="text-3xl font-extrabold text-black dark:text-white">
            Log In
          </h1>
          <div className="flex flex-col gap-2">
            <Input
              value={email}
              type="email"
              placeholder="Enter your email address..."
              onChange={(e) => setEmail(e.target.value)}
              className={error ? 'border-red-500 focus:border-neutral-200' : ''}
            />
            <div className="flex flex-col gap-1">
              <Input
                value={password}
                type="password"
                placeholder="•••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className={
                  error ? 'border-red-500 focus:border-neutral-200' : ''
                }
              />
              {error && <div className="text-xs text-red-500">{error}</div>}
            </div>
          </div>

          <Button
            className="rounded-md bg-primary p-2 shadow-sm"
            onClick={handleSignIn}
            type="submit"
          >
            Continue
          </Button>

          <div className="flex flex-col sm:flex-row justify-center gap-2 text-center text-sm">
            <Link href="/forgot_password" className="tracking-wide underline">
              Forgot your password?
            </Link>
            <span className="hidden sm:block">•</span>
            <Link href="/register" className="tracking-wide underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
