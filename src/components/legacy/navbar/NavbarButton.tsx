import React from "react";
import { clsx } from "clsx";
import type { LucideIcon } from "lucide-react";

type ButtonProps = {
  link: string;
  icon: LucideIcon;
  children?: string;
  prominent?: boolean;
};

function NavbarButton({
  link,
  icon,
  prominent,
  children,
  ...props
}: ButtonProps) {
  const iconComp = React.createElement(icon, { className: "pr-2" });

  return (
    <li>
      <a
        {...props}
        href={link}
        className={clsx(
          `min-w-fit rounded-md px-3 py-3 text-white no-underline decoration-solid decoration-auto 
            transition-all ease-in-out`,
          prominent
            ? "outline outline-1 outline-red-500 hover:bg-red-500"
            : "hover:bg-neutral-700"
        )}>
        {iconComp}
        {children}
      </a>
    </li>
  );
}

export default NavbarButton;
