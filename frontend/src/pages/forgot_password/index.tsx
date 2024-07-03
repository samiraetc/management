import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const ForgotPassword = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
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
            `/${workspaceUrl ?? (session?.user.workspaces && session?.user.workspaces[0].url_key)}`
          );
    }
  }, [status, router, session, workspaceUrl]);

  if (status === 'loading' || status === 'authenticated') {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 min-h-screen">
      <div className="flex justify-between px-7 pt-5 sm:px-10">
        <Link href="/" className="flex items-center gap-1">
          <ChevronLeft width={14} height={14} />
          Back
        </Link>
        <ModeToggle />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-80 flex-col justify-between gap-4 align-middle sm:w-1/3">
          <h1 className="text-3xl font-extrabold text-black dark:text-white">
            Forgot Password
          </h1>
          <div className="flex flex-col gap-2">
            <Input
              value={email}
              type="email"
              placeholder="Enter your email address..."
              onChange={(e) => setEmail(e.target.value)}
              className={error ? 'border-red-500 focus:border-neutral-200' : ''}
            />
          </div>

          <Button className="rounded-md bg-primary p-2 shadow-sm" type="submit">
            Send code
          </Button>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-2">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button
              className="w-full rounded-md bg-primary p-2 shadow-sm"
              type="submit"
            >
              Verify Code
            </Button>
          </div>

          <div className="flex justify-center gap-2 text-center text-sm">
            <Link href="/login" className="tracking-wide underline">
              Did you remember your password? Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
