import { type GuestModel } from '@/types/guest';

const getAmountRaised = (guests: GuestModel[]) => {
  const paidGuests = guests.filter((guest) => guest.paid);
  const amountRaised = paidGuests.reduce((acc, curr) => acc + curr.contribution, 0);

  return amountRaised;
};

export default getAmountRaised;
