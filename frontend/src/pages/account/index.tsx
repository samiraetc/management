import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

const Account = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Avatar className="size-16">
          <AvatarImage
            className="wrounded-"
            src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-medium">{`${session?.user.full_name}`}</p>
          <p className="text-sm font-normal">Your personal account</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
