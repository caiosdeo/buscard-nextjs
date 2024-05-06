"use client";

import Link from "next/link";
import { useAuth } from '@clerk/nextjs';
import { SignUpButton, useUser } from "@clerk/clerk-react";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export const Heading = () => {

  const { isSignedIn, isLoaded } = useAuth();

  const { user } = useUser();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Saldo, recarga e passagens do seu cartão de ônibus.
        Em um único lugar. Bem vindo ao <span className='underline'>BusCard</span>.
      </h1>
      <h3 className="text-base sm:text-xl md:text2xl font-medium">
        BusCard é o que você precisa para visualizar e controlar os gastos relacionados ao seu cartão de passagens.
      </h3>
      {!isLoaded && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isLoaded && !isSignedIn && (
        <SignUpButton mode="modal" forceRedirectUrl={'/new-card'}>
          <Button>
            Cadastrar
            <ArrowRight className="h-4 w-4 ml-2"/>
          </Button>
        </SignUpButton>
      )}
      {isLoaded && isSignedIn && (
        <Button asChild>
          <Link href={`/${user?.id}/balance`}>
            Entrar
            <ArrowRight className="h-4 w-4 ml-2"/>
          </Link>
        </Button>
      )}
    </div>
  );
};
