import { Barbecue } from "@/types/barbecue";
import { guestMock } from "./guests";

export const barbecueMock: Barbecue = {
  _id: '559437a0-49be-11ee-be56-0242ac120002',
  userId: 'bc47839d-f734-43d2-ae72-372a18eb5106',
  name: 'Churras do João',
  date: '01/12',
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
    _id: '611ee7aa-49be-11ee-be56-0242ac120002',
  },
  {
    ...barbecueMock,
    _id: '631100f2-49be-11ee-be56-0242ac120002',
  },
]