/* eslint-disable  @typescript-eslint/no-explicit-any */

'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import { Check, ChevronLeft } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle/ModeToggle';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import useWorkspaceUrl from '@/hook/useWorkspaceStorage/useWorkspaceStorage';
import { createUser } from '@/services/User/userService';
import { passwordRequeriment, validatePassword } from '@/utils/password';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [username, setUsername] = useState<string>('');
  const [passwordRequirements, setPasswordRequirements] =
    useState(passwordRequeriment);
  const [showRequeriment, setShowRequeriment] = useState(false);
  const { toast } = useToast();
  const [errors, setErrors] = useState<any>({});

  useWorkspaceUrl();
  useEffect(() => {
    const [user] = email.split('@');
    setUsername(user);
  }, [email]);

  useEffect(() => {
    validatePassword(password, confirmPassword, setPasswordRequirements);
  }, [password, confirmPassword]);

  const handleClickCreateAccount = useCallback(() => {
    const errorCallback = (error: any) => {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong :(',
          description: (
            <ul>
              {Object.entries(error.response.data.errors).map(
                ([field, errorMessage], index) => (
                  <li key={index}>{`${field}: ${errorMessage}`}</li>
                ),
              )}
            </ul>
          ),
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong :(',
          description: 'Failed to create account. Please try again later.',
        });
      }
    };

    createUser({
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
    })
      .then(() => router.push(`/login`))
      .catch(errorCallback);
  }, [firstName, lastName, username, email, password]);

  return (
    <div className="flex min-h-screen flex-col gap-1">
      <Toaster />
      <div className="flex justify-between px-7 pt-5 sm:px-10">
        <Link href="/login" className="flex items-center gap-1">
          <ChevronLeft width={14} height={14} />
          Back
        </Link>
        <ModeToggle />
      </div>
      <div
        className={`flex flex-1 ${showRequeriment ? 'mb-10' : 'mt-5 sm:mt-0'} items-center justify-center`}
      >
        <div className="flex w-80 flex-col justify-between gap-4 sm:w-1/4">
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
                  className={errors.first_name && 'border-red-500'}
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
                  className={errors.last_name && 'border-red-500'}
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
              className={errors.password && 'border-red-500'}
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
                  {passwordRequirements.map((item) => (
                    <p
                      key={item.name}
                      className={`flex items-center gap-1 ${item.check && 'text-green-600'}`}
                    >
                      <Check width={12} />
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button
            disabled={password !== confirmPassword}
            className="rounded-md p-2 shadow-sm disabled:bg-gray-400"
            onClick={handleClickCreateAccount}
          >
            Create
          </Button>

          <div className="text-center text-sm tracking-wide underline">
            <Link href="/login">Do you have an account? Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
