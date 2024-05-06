"use server";

import { redirect } from "next/navigation";

import connectDB from "@/db/mongoose";
import { Card, ICard } from "@/db/schemas/card";

export async function createCard(formData: FormData) {

  await connectDB();

  const user = formData.get("user");
  const balance = parseFloat(String(formData.get("balance")).replace(",", "."));
  const simpleTickets = parseInt(String(formData.get("simpleTickets")));
  const doubleTickets = parseInt(String(formData.get("doubleTickets")));
  const monthlySimpleTickets = 4 * simpleTickets;
  const monthlyDoubleTickets = 4 * doubleTickets;
  const simpleTicketPrice = parseFloat(String(formData.get("simpleTicketPrice")).replace(",", "."));
  const doubleTicketPrice = parseFloat(String(formData.get("doubleTicketPrice")).replace(",", "."));
  const monthlyRecharge = (monthlySimpleTickets * simpleTicketPrice) + (monthlyDoubleTickets * doubleTicketPrice);
  const currentSimpleTickets = Math.floor(balance / simpleTicketPrice);
  const currentDoubleTickets = Math.floor(balance / doubleTicketPrice);
  const currentMonthlyRecharge = monthlyRecharge - balance;

  await Card.create({
    user,
    balance,
    simpleTickets,
    doubleTickets,
    monthlySimpleTickets,
    monthlyDoubleTickets,
    simpleTicketPrice,
    doubleTicketPrice,
    monthlyRecharge,
    currentSimpleTickets,
    currentDoubleTickets,
    currentMonthlyRecharge
  });

  redirect(`/${user}/balance`);
}

export async function updateBalance(formData: FormData) {
  await connectDB();

  const user = formData.get("user");

  const card: ICard | null = await Card.findOne({ user: user }).lean();

  if (card !== null){
    const updatedBalance = parseFloat(String(formData.get("balance")).replace(",", "."));
    card.balance = updatedBalance;
    card.currentMonthlyRecharge = card.monthlyRecharge - updatedBalance;
    card.currentSimpleTickets = Math.floor(updatedBalance / card.simpleTicketPrice);
    card.currentDoubleTickets = Math.floor(updatedBalance / card.doubleTicketPrice);
    
    await Card.findByIdAndUpdate(card._id, card);
  }
}

export async function decrementBalance(card: ICard) {
  await connectDB();

  if (card !== null){
    await Card.findByIdAndUpdate(card._id, card);
  }
}

export async function updateCardSettings(formData: FormData) {
  await connectDB();

  const user = formData.get("user");

  const card: ICard | null = await Card.findOne({ user: user }).lean();

  if (card !== null){
    const simpleTickets = parseInt(String(formData.get("simpleTickets")));
    const doubleTickets = parseInt(String(formData.get("doubleTickets")));
    card.simpleTickets = simpleTickets;
    card.doubleTickets = doubleTickets;

    const monthlySimpleTickets = 4 * simpleTickets;
    const monthlyDoubleTickets = 4 * doubleTickets;
    card.monthlySimpleTickets = monthlySimpleTickets;
    card.monthlyDoubleTickets = monthlyDoubleTickets;

    const simpleTicketPrice = parseFloat(String(formData.get("simpleTicketPrice")).replace(",", "."))
    const doubleTicketPrice = parseFloat(String(formData.get("doubleTicketPrice")).replace(",", "."))
    card.simpleTicketPrice = simpleTicketPrice;
    card.doubleTicketPrice = doubleTicketPrice;

    const monthlyRecharge = (monthlySimpleTickets * simpleTicketPrice) + (monthlyDoubleTickets * doubleTicketPrice);
    card.monthlyRecharge = monthlyRecharge;
    card.currentMonthlyRecharge = monthlyRecharge - card.balance;

    card.currentSimpleTickets = Math.floor(card.balance / simpleTicketPrice);
    card.currentDoubleTickets = Math.floor(card.balance / doubleTicketPrice);

    await Card.findByIdAndUpdate(card._id, card);
  }
}

export async function deleteCard(userId: string) {
  await connectDB();

  await Card.deleteOne({ user: userId });

  redirect("/");
}

export async function getCard(formData: FormData) {
  await connectDB();

  const card = await Card.findById(formData.get("_id"));

  return card;
}

export async function getCardByUser(user: string) {
  await connectDB();

  const card: ICard | null = await Card.findOne({ user: user }).lean();

  if (card !== null){
    const retCard = (({ _id: _, ...data }) => ({ _id: card._id.toString(), ...data }))(card);
    return retCard;
  }
}
