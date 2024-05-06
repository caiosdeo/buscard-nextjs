"use client";

import { toast } from "sonner";

import { createCard } from "@/actions/card-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/clerk-react";

const NewCardPage = () => {
  const { user } = useUser();

  const handleNewCard = (formData: FormData) => {
    try {
      createCard(formData);
      toast.success("Cartão criado!");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    }
  }

  return (
    <div className="m-6 flex flex-col justify-evenly space-y-8">
      <h1 className="text-3xl font-bold ml-2">Criando cartão</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configuração inicial</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleNewCard}>
            <Input
              name="user"
              defaultValue={user?.id}
              readOnly
              type="text"
              hidden
              className="hidden"
            />
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="balance">Saldo</Label>
                <Input name="balance" type="text" placeholder="e.g. 63.80" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="simpleTicketPrice">
                  Valor passagem simples
                </Label>
                <Input
                  name="simpleTicketPrice"
                  type="text"
                  placeholder="e.g. 3.75"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="simpleTickets">Passagens simples</Label>
                <Input name="simpleTickets" type="text" placeholder="2" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="doubleTicketPrice">Valor passagem dupla</Label>
                <Input
                  name="doubleTicketPrice"
                  type="text"
                  placeholder="e.g. 5.63"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="doubleTickets">Passagens duplas</Label>
                <Input name="doubleTickets" type="text" placeholder="10" />
              </div>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCardPage;
