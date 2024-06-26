"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from '@clerk/nextjs';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";

import { useScrollTop } from "@/hooks/use-scroll-top";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export const Navbar = () => {

  const { isSignedIn, isLoaded } = useAuth();

  const { user } = useUser();

  const scrolled = useScrollTop();

  return (
    <div className={cn(
      "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
      scrolled && "border-b shadow-sm"
    )}>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!isLoaded && (
          <Spinner />
        )}
        {isLoaded && !isSignedIn && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl={'/new-card'}>
              <Button size="sm">
                Cadastrar
              </Button>
            </SignUpButton>
          </>
        )}
        {isLoaded && isSignedIn && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`${user?.id}/balance`}>
                Entrar
              </Link>
            </Button>
            <UserButton afterSignOutUrl="/"/>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );

}