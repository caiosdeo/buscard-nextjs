"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { getCardByUser } from "@/actions/card-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RechargePage = () => {
  const params = useParams();

  const [card, setCard] = useState({
    user: params.cardId,
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
        setCard(cardData);
      } catch (error) {
        console.error("Erro ao buscar o cartão:", error);
      }
    };

    fetchCard();
  }, [params]);

  return (
    <div className="m-6">
      <h1 className="text-3xl font-bold ml-2">Recarga</h1>
      <Card className="my-6 h-40 text-white bg-neutral-800 dark:bg-black">
        <CardHeader>
          <CardTitle className="my-4 text-3xl">{card.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</CardTitle>
          <CardDescription>Saldo</CardDescription>
        </CardHeader>
      </Card>
      <Card className="my-4 dark:bg-neutral-800">
        <CardHeader>
          <CardTitle>Planejamento mensal</CardTitle>
          <CardDescription>
            Quantidade de passagens usadas no mês
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 flex flex-col">
          <div className="mb-4 pb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Passagens simples
              </p>
              <p className="text-sm text-muted-foreground">{card.monthlySimpleTickets}</p>
            </div>
          </div>
          <div className="mb-4 pb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Passagens Duplas
              </p>
              <p className="text-sm text-muted-foreground">{card.monthlyDoubleTickets}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground leading-none">Recarga</p>
              <p className="text-2xl font-bold">{card.currentMonthlyRecharge.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RechargePage;
