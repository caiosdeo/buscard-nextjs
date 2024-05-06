"use client";

import { useState, useEffect } from "react";
import { redirect, useParams, useRouter } from "next/navigation";

import { decrementBalance, getCardByUser } from "@/actions/card-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICard } from "@/db/schemas/card";
import { toast } from "sonner";

const BalancePage = () => {
  const params = useParams();
  const router = useRouter();

  const [card, setCard] = useState({
    user: params.cardId as string,
    balance: 0,
    simpleTickets: 0,
    doubleTickets: 0,
    monthlySimpleTickets: 0,
    monthlyDoubleTickets: 0,
    simpleTicketPrice: 0,
    doubleTicketPrice: 0,
    monthlyRecharge: 0,
    currentSimpleTickets: 0,
    currentDoubleTickets: 0,
    currentMonthlyRecharge: 0
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cardData = await getCardByUser(params.cardId as string);
        if (cardData !== undefined){
          setCard(cardData);
        }
      } catch (error) {
        console.error("Erro ao buscar o cartão:", error);
      }
    };

    fetchCard();
  }, [params]);

  const handleDecrementTicket = async (isSimple: boolean) => {
    const ticketPrice = isSimple ? card.simpleTicketPrice : card.doubleTicketPrice;
    if (card.balance - ticketPrice > 0){
      const newBalance = card.balance - ticketPrice;
      const currentMonthlyRecharge = card.monthlyRecharge - newBalance;
      const currentSimpleTickets = Math.floor(newBalance / card.simpleTicketPrice);
      const currentDoubleTickets = Math.floor(newBalance / card.doubleTicketPrice);

      card.balance = newBalance;
      card.currentMonthlyRecharge = currentMonthlyRecharge;
      card.currentSimpleTickets = currentSimpleTickets;
      card.currentDoubleTickets = currentDoubleTickets;

      await decrementBalance(card as ICard);

      router.push(`/${params.cardId}/balance`);

      if (currentSimpleTickets <= card.simpleTickets && currentDoubleTickets <= card.doubleTickets) {
        toast.warning("Passagens para uma semana somente!");
      }

    } else {
      toast.error("Saldo insuficiente!");
    }
  }

  return (
    <div className="m-6">
      <h1 className="text-3xl font-bold ml-2">Saldo</h1>
      <div className="flex flex-col">
        <Card className="my-6 h-40 text-white bg-neutral-800 dark:bg-black">
          <CardHeader>
            <CardTitle className="my-4 text-3xl">{card.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</CardTitle>
            <CardDescription>Saldo</CardDescription>
          </CardHeader>
        </Card>
        <Card className="my-4 flex flex-row items-center justify-evenly dark:bg-neutral-800">
          <CardHeader>
            <CardTitle>{card.currentSimpleTickets}</CardTitle>
            <CardDescription>Passagens simples</CardDescription>
          </CardHeader>
          <CardContent className="mt-5">
            <Button onClick={() => handleDecrementTicket(true)} className="font-bold">-1</Button>
          </CardContent>
        </Card>
        <Card className="my-4 flex flex-row items-center justify-evenly dark:bg-neutral-800">
          <CardHeader>
            <CardTitle>{card.currentDoubleTickets}</CardTitle>
            <CardDescription>Passagens duplas</CardDescription>
          </CardHeader>
          <CardContent className="mt-5">
            <Button onClick={() => handleDecrementTicket(false)}  className="font-bold">-1</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BalancePage;
