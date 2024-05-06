"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/clerk-react";

import { deleteCard, updateBalance, updateCardSettings } from "@/actions/card-actions";
import { deleteUser } from "@/actions/clerk-action";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ModeToggle } from "@/components/mode-toggle";

const SettingsPage = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleUpdateBalance = (formData: FormData) => {
    updateBalance(formData);
    toast.success("Saldo atualizado!", {
      description: "Novo saldo pode ser verificado na aba de cartão.",
    });
  };

  const handleUpdateSettings = (formData: FormData) => {
    updateCardSettings(formData);
    toast.success("Configurações atualizadas!", {
      description: "Novo planejamento pode ser verificado na aba recarga.",
    });
  };

  const handleDeleteCard = async () => {
    try {
      await deleteCard(user?.id as string);
      router.push(`/new-card`);      
      toast.success("Cartão excluído!")
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro!");
    }
  }
  
  const handleDeleteAccount = async () => {
    try {
      
      await deleteUser(user?.id as string);
      await deleteCard(user?.id as string);
      toast.success("Conta excluída!")
      router.push(`/`);
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro!");
    }
  }

  return (
    <div className="m-6 flex flex-col justify-evenly space-y-8">
      <h1 className="text-3xl font-bold ml-2">Configurações</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full items-center gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="font-semibold">{user?.fullName}</span>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-12 w-12",
                  },
                }}
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="font-semibold">Alterar tema</span>
              <ModeToggle />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Atualizar saldo</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleUpdateBalance}>
            <Input
              name="user"
              defaultValue={user?.id}
              readOnly
              type="text"
              hidden
              className="hidden"
            />
            <div className="grid w-full items-center gap-4">
              <Label htmlFor="balance">Saldo</Label>
              <div className="flex w-full items-center space-x-2">
                <Input name="balance" type="text" placeholder="e.g. 63.80" />
                <Button type="submit">Atualizar</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Configuração</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleUpdateSettings}>
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
                <Label htmlFor="simpleTicketsPrice">
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
                <Label htmlFor="doubleTicketsPrice">Valor passagem dupla</Label>
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
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar conta</CardTitle>
          <CardDescription>Excluir conta e cartão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col space-y-1.5">
            <Button onClick={handleDeleteCard} variant="destructive" className="flex flex-row justify-evenly">
              <span className="font-semibold">Excluir cartão</span>
            </Button>
            <Button onClick={handleDeleteAccount} variant="destructive" className="flex flex-row justify-evenly">
              <span className="font-semibold">Apagar conta</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
