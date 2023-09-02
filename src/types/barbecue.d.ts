import { Guest } from "./guest";

type Barbecue = {
  id: number;
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