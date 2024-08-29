'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { editUser, getUser } from '@/services/User/userService';
import { CircleUserRound } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useState } from 'react';

const WorkspaceGeneral = () => {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleGetUserInfos = async () => {
    await getUser(session?.user?.id ?? '').then((response) => {
      setFirstName(response.first_name ?? '');
      setLastName(response.last_name ?? '');
      setUsername(response.username ?? '');
      setImage(response.image ?? null);
    });
  };

  useEffect(() => {
    handleGetUserInfos();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditUser = async (payload: EditUser) => {
    await editUser(session?.user.id ?? '', payload);
  };

  return (
    <div className="m-4 mx-auto w-[21rem] sm:mt-12 sm:w-[35rem] lg:mt-24 lg:w-[40rem]">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="text-3xl font-normal">Profile</div>
          <div className="text-sm text-black/50 dark:text-white/70">
            Manage your profile
          </div>
        </div>

        <div className="rounded-md border">
          <div className="h-56 border-b bg-gray-100 p-4">
            <Label htmlFor="first_name" className="text-sm font-medium">
              Profile Picture
            </Label>
            <div className="flex items-center justify-center">
              <div className="relative flex size-36 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                {image ? (
                  <Avatar>
                    <AvatarImage
                      src={image as string}
                      alt="Profile"
                      className="size-full object-cover"
                    />
                  </Avatar>
                ) : (
                  <CircleUserRound
                    className="text-7xl text-gray-500"
                    width={144}
                    height={144}
                    strokeWidth={0.8}
                  />
                )}

                <input
                  type="file"
                  id="file-upload"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={handleFileChange}
                  onBlur={() =>
                    handleEditUser({
                      image: image as string,
                      position: '',
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="space-y-3 p-4">
            <div className="flex w-full items-center justify-between">
              <Label htmlFor="first_name" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                className="w-72 disabled:bg-gray-100 disabled:text-black"
                value={firstName}
                type="text"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() =>
                  handleEditUser({
                    first_name: firstName,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex w-full items-center justify-between">
              <Label htmlFor="last_name" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                className="w-72 disabled:bg-gray-100 disabled:text-black"
                value={lastName}
                type="text"
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() =>
                  handleEditUser({
                    last_name: lastName,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex w-full items-center justify-between">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>

              <Input
                className="w-72"
                value={username}
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() =>
                  handleEditUser({
                    username,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceGeneral;
