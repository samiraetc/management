"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";
import { IMenuSidebarButton } from "./types";

const MenuSidebarButton: FC<IMenuSidebarButton> = ({ icon, name, url, onClick }) => {
  return (
    <Link href={url ?? ''}>
      <Button
        variant="ghost"
        className="gap-2 w-full justify-start hover:bg-muted h-8"
        onClick={onClick}
      >
        {icon}
        <p className="text-md"> {name}</p>
      </Button>
    </Link>
  );
};

export default MenuSidebarButton;
