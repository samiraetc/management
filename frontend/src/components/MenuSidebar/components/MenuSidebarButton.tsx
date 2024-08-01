'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { FC } from 'react';
import { IMenuSidebarButton } from './types';

const MenuSidebarButton: FC<IMenuSidebarButton> = ({
  icon,
  name,
  url,
  onClick,
  className
}) => {
  return (
    <Link href={url ?? ''} className={className}>
      <Button
        variant="ghost"
        className="h-8 w-full justify-start gap-2 hover:bg-muted/80"
        onClick={onClick}
      >
        {icon}
        <p className="text-md"> {name}</p>
      </Button>
    </Link>
  );
};

export default MenuSidebarButton;
