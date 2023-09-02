'use client';

import Guest from './Guest';
import AddGuest from './AddGuest';
import { type GuestModel } from '@/types/guest';
import { type BarbecueModel } from '@/types/barbecue';

type BarbecueGuestsListProps = {
  guests: GuestModel[];
  price: BarbecueModel['price'];
  barbecueId: string;
};

const BarbecueGuestsList = ({ guests = [], price, barbecueId }: BarbecueGuestsListProps) => {
  return (
    <div className="barbecue-guests-list-container">
      {guests.map((guest) => (
        <Guest key={guest.id} guest={guest} guests={guests} barbecueId={barbecueId} />
      ))}
      <AddGuest barbecueId={barbecueId} price={price} guests={guests} />
    </div>
  );
};

export default BarbecueGuestsList;
