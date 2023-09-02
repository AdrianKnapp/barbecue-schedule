import { Barbecue } from "@/types/barbecue";
import { guestMock } from "./guests";

export const barbecueMock: Barbecue = {
  id: 1,
  name: 'Churras do João',
  date: new Date().toISOString(),
  description: 'Churras do João',
  price: {
    drinkIncluded: 50,
    drinkNotIncluded: 30,
  },
  amountRaised: 0,
  guests: [
    guestMock,
    guestMock
  ],
}

export const barbecueListMock: Barbecue[] = [
  {
    ...barbecueMock,
    id: 1,
  },
  {
    ...barbecueMock,
    id: 2,
  },
]