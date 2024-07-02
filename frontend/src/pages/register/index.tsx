import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { passwordRequeriment, validatePassword } from './utils';
import { verify } from 'crypto';
import { Check, ChevronLeft } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [passwordRequirements, setPasswordRequirements] =
    useState(passwordRequeriment);

  const [showRequeriment, setShowRequeriment] = useState(false);
  const [workspaceUrl, setWorkspaceUrl] = useState('');


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWorkspaceUrl(localStorage.getItem('workspace') ?? '');
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      session?.user.workspaces?.length === 0
        ? router.push('/join')
        : router.push(
            `/${workspaceUrl ?? (session?.user.workspaces && session?.user.workspaces[0].url_key)}`,
          );
    }
  }, [status, router, status]);

  if (status === 'loading' || status === 'authenticated') {
    return null;
  }

  useEffect(() => {
    const [user, _] = email.split('@');
    setUsername(user);
  }, [email]);

  useEffect(() => {
    validatePassword(password, confirmPassword, setPasswordRequirements);
  }, [password, confirmPassword]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between px-7 sm:px-10  pt-5">
        <Link href="/" className="flex items-center gap-1">
          <ChevronLeft width={14} height={14} />
          Back
        </Link>
        <ModeToggle />
      </div>
      <div
        className={`text-transparent-black flex  ${showRequeriment ? 'h-full mb-10 flex-col items-center' : ' mt-5 sm:mt-0 h-full sm:h-screen items-center justify-center'}`}
      >
        <div className="flex w-80 flex-col justify-between gap-4 align-middle sm:w-1/4">
          <h1 className="text-3xl font-extrabold text-black dark:text-white">
            Create Account
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="w-full">
                <Label htmlFor="first_name" className="text-xs font-normal">
                  First Name
                </Label>
                <Input
                  value={firstName}
                  type="text"
                  id="first_name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="w-full">
                <Label htmlFor="last_name" className="text-xs font-normal">
                  Last Name
                </Label>

                <Input
                  value={lastName}
                  type="text"
                  id="last_name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <Label htmlFor="email" className="text-xs font-normal">
              Email
            </Label>
            <Input
              value={email}
              type="email"
              id="email"
              placeholder="account@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="username" className="text-xs font-normal">
              Username
            </Label>
            <Input
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label htmlFor="password" className="text-xs font-normal">
              Password
            </Label>
            <Input
              value={password}
              type="password"
              id="password"
              placeholder="•••••••••"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowRequeriment(true)}
            />

            <Label htmlFor="confirm_password" className="text-xs font-normal">
              Confirm Password
            </Label>
            <Input
              value={confirmPassword}
              type="password"
              placeholder="•••••••••"
              id="confirm_password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {showRequeriment && (
              <div className="mt-2 flex flex-col gap-1 text-xs">
                <p className="font-semibold">Password must contain</p>
                <div>
                  {passwordRequirements.map((item) => {
                    return (
                      <p
                        className={`${item.check && 'text-green-600'} flex items-center gap-1`}
                      >
                        <Check width={12} />
                        {item.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <button
            disabled={password != confirmPassword}
            className="rounded-md bg-black p-2 text-white shadow-sm disabled:bg-gray-400"
            // onClick={handleSingin}
          >
            Create
          </button>

          <div className="text-center text-sm tracking-wide underline">
            <Link href="/login">Do you have an account? Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
