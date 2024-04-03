import { useMemo } from "react";
import Image from "next/image";
import { type AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface UserAvatarProps extends AvatarProps {
  user: User;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const image = useMemo(() => {
    const defaultImage = "https://avatar.vercel.sh/rauchg?size=40";

    if (!user.name?.split(" ")[0]) return defaultImage;

    const fname = user.name.split(" ")[0];
    const initials = getInitials(user.name);
    const firstName = fname
      ? fname.charAt(0).toUpperCase() + fname.slice(1)
      : null;

    return firstName
      ? `https://avatar.vercel.sh/${firstName}.svg?size=40&text=${initials}`
      : defaultImage;
  }, [user.name]);

  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          {/* <Icons.user className="h-4 w-4" /> */}
          <Image
            // would be "https://avatar.vercel.sh/Mahmoud?size=40&text=MA"
            src={image}
            alt="Picture"
            width={40}
            height={40}
          />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
