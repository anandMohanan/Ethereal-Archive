"use client";
import { SignedOut } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { FAQ } from "../LandingPage/Faq";
import { Features } from "../LandingPage/Features";
import { AppLanding } from "../LandingPage/MainContent";

export const SignedOutComponents = () => {
  return (
    <SignedOut>
      <AppLanding />
      <Separator />
      <Features />
      <FAQ />
    </SignedOut>
  );
};
