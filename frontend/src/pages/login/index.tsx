import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useWorkspaceUrl from '@/hook/useWorkspaceStorage/useWorkspaceStorage';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useWorkspaceUrl();
  const handleSignIn = async () => {
    const result = await signIn('credentials', {
      email,
      password,
    });

    if (result?.error) {
      setError('Email ou senha inválido');
    } else {
      setError(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-1">
      <div className="flex justify-end px-7 pt-5 sm:px-10">
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

          <div className="flex flex-col justify-center gap-2 text-center text-sm sm:flex-row">
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
