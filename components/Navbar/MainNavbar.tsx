import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-toggle";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";

export const Nav = () => {
  return (
    // <div className="border-b py-4">
    //   <div className="hidden sm:flex items-center container mx-auto justify-between">
    //     <div>Ethereal Archive</div>
    //     <OrganizationSwitcher
    //       appearance={{
    //         baseTheme: neobrutalism,
    //       }}
    //     />
    //     <div className="flex gap-2">
    //       <UserButton />
    //       <SignedOut>
    //         <SignInButton mode="modal">
    //           <Button>Sign In</Button>
    //         </SignInButton>
    //       </SignedOut>
    //     </div>
    //   </div>
    // </div>
    <nav className=" sticky inset-x-0 top-0 z-30 h-14 w-full   backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <a href="/" className="z-40 flex font-semibold">
            <span>Ethereal Archive</span>
          </a>

          <MobileNav />

          <div className="hidden items-center space-x-4 sm:flex">
            <OrganizationSwitcher />
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
            <ModeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
