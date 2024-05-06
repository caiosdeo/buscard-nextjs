import { Schema, model, models, Document, ObjectId } from 'mongoose';

export interface ICard extends Document {
  _id: ObjectId,
  user: string;
  balance: number,
  simpleTickets: number,
  doubleTickets: number,
  monthlySimpleTickets: number,
  monthlyDoubleTickets: number,
  simpleTicketPrice: number,
  doubleTicketPrice: number,
  monthlyRecharge: number,
  currentSimpleTickets: number,
  currentDoubleTickets: number,
  currentMonthlyRecharge: number
}

const CardSchema = new Schema<ICard>({
  user: {
    type: String,
    unique: true,
  },
  balance: Number,
  simpleTickets: Number,
  doubleTickets: Number,
  monthlySimpleTickets: Number,
  monthlyDoubleTickets: Number,
  simpleTicketPrice: Number,
  doubleTicketPrice: Number,
  monthlyRecharge: Number,
  currentSimpleTickets: Number,
  currentDoubleTickets: Number,
  currentMonthlyRecharge: Number
});

export const Card = models.Card || model<ICard>('Card', CardSchema);


