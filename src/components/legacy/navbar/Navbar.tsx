import React, { useState } from "react";
import { Landmark, Info, Notebook } from "lucide-react";
import { clsx } from "clsx";
import UserAvatar from "./Avatar";
import NavbarButton from "./NavbarButton";
import ConfirmPopup from "../popups/ConfirmPopup";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

type Props = {};

async function Navbar({}: Props) {
  const session = await getServerAuthSession();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const toggleSideMenu = () => setSideMenuOpen(!sideMenuOpen);

  return (
    <div className="h-[15vh] select-none">
      <nav className="duration-50 fixed inset-x-8 top-5 flex h-20 w-auto items-center justify-between rounded-xl bg-neutral-900 px-8 py-0 shadow-lg transition-colors hover:bg-neutral-800 md:text-lg lg:text-xl">
        <h1 className="flex-shrink-0 cursor-pointer justify-self-start text-white">
          <span>Student Planner</span> <Notebook className="ml-1 text-xl" />
        </h1>
        {/* Mobile Menu */}
        {/* <div className='menu-icon' onClick={toggleSideMenu}>
                    <FontAwesomeIcon icon={sideMenuOpen ? faTimes : faBarsStaggered} />
                </div> */}
        <ul
          className={clsx(
            "flex flex-shrink-0 flex-row items-center justify-end gap-2 text-center",
            sideMenuOpen ? "active" : "",
          )}
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          {session?.user && <UserAvatar user={session?.user} />}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
