"use client";

import Link from "next/link";
import { type User } from "next-auth";
import { signOut } from "next-auth/react";

import { dashboardConfig } from "@/config/dashboard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex h-fit w-full items-center justify-start p-0">
          <div className="flex h-full w-full flex-row items-center justify-start gap-4 overflow-ellipsis p-4">
            <UserAvatar user={user} className="h-10 w-10" />
            <p
              className="truncate text-xl font-semibold leading-none tracking-tight"
              style={{
                margin: 0,
              }}>
              Mahmoud Alhussen
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-full truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {dashboardConfig.sidebarNav.map((item, idx) => {
          if (
            item.managerOnly
            // TODO && user.role !== "MANAGER"
          ) {
            return null;
          }

          return (
            <DropdownMenuItem key={idx} asChild>
              <Link prefetch href={item.href}>
                {item.title}
              </Link>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            void signOut({
              callbackUrl: `${window.location.origin}/auth/login`,
            });
          }}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
