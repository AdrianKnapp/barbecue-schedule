import { Guest } from "./guest";

type Barbecue = {
  _id: string;
  userId: string;
  date: string;
  name: string;
  description: string;
  price: {
    drinkIncluded: number;
    drinkNotIncluded: number;
  };
  amountRaised: number;
  guests: Guest[];
};