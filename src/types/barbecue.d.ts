import { type GuestModel } from './guest';

type BarbecueModel = {
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
  guests: GuestModel[];
};
