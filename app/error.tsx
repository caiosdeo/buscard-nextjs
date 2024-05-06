"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return ( 
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-medium">
        Algo deu errado!
      </h2>
      <Button asChild>
        <Link href="/">
          Voltar
        </Link>
      </Button>
    </div>
  );
}

export default Error;