"use client";

import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-toggle";

const MobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  return (
    <div className="sm:hidden">
      <Menu onClick={toggleOpen} className="relative z-50 h-5 w-5 " />

      {isOpen ? (
        <div className="animate-in slide-in-from-top-5 fade-in-20 fixed inset-0 z-0 w-full dark:bg-black bg-white">
          <ul className="absolute grid w-full gap-3 border-b px-5 pb-2  pt-20 shadow-xl dark:bg-black bg-white">
            <div className="flex justify-between">
              <ModeToggle />
              <UserButton />
            </div>
            <SignedIn>
              <li>
                <Button
                  variant={"default"}
                  // onClick={() => closeOnCurrent("/sign-up")}
                  className="flex w-full font-semibold "
                  // href="/sign-up"
                >
                  <OrganizationSwitcher />
                </Button>
              </li>
              {/* <li className="my-3 h-px w-full " /> */}
            </SignedIn>

            <SignedOut>
              <li>
                <Button
                  variant={"default"}
                  //   onClick={() => closeOnCurrent("/dashboard")}
                  className="flex w-full items-center font-semibold"
                  //   href="/dashboard"
                >
                  <SignInButton mode="modal">Sign In</SignInButton>
                </Button>
              </li>
              <li className="my-3 h-px w-full " />
            </SignedOut>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
