"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/spinner";

const NewCardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isSignedIn) {
    return redirect("/");
  }

  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <main className="flex-1 h-full mb-20 overflow-y-auto">{children}</main>
    </div>
  );
};

export default NewCardLayout;
