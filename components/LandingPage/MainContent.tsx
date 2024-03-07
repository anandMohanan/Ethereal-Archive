"use client";

import { SignInButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function AppLanding() {
  return (
    <>
      <div className="container mx-auto h-[500px] pt-10 dark:bg-grid-white/[0.2] bg-grid-black/[0.2]   relative ">
        {/* Radial gradient for the container to give a faded look */}
        {/* dark:bg-grid-white/[0.2] bg-grid-black/[0.2] */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-stone-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <p className="flex lg:text-6xl text-2xl text-pretty  font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
          {/* <TypewriterEffectSmooth words={words} /> */}
          {/* asdjkk hskjf hksd f sdfksdfdf khjhnb */}
          Empower collaboration, securely store and share files effortlessly.
        </p>
        <div className="flex justify-center">
          <SignInButton mode="modal">
            <Button className=" hover:animate-pulse mt-10">
              Sign in to get started <ArrowRight className="" />
            </Button>
          </SignInButton>
        </div>
      </div>
    </>
  );
}
