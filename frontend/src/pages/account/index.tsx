import React from 'react';
import Input from '@/components/Input/Input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { translation } from '@/i18n/i18n';

const Account = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Avatar className="h-16 w-16">
          <AvatarImage
            className="wrounded-"
            src="https://api.dicebear.com/8.x/lorelei/svg?backgroundColor=8fc69b&hair=variant18&earrings=variant01&mouth=happy16&eyes=variant23&scale=160"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-medium">Samira Costa</p>
          <p className="text-sm font-normal">Your personal account</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
