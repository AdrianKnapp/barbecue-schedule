'use client';

import Guest from './Guest';
import AddGuest from './AddGuest';
import { type Guest as GuestModel } from '@/types/guest';
import { Barbecue } from '@/types/barbecue';

type BarbecueGuestsListProps = {
  guests: GuestModel[];
  price: Barbecue['price'];
  barbecueId: string;
};

const BarbecueGuestsList = ({ guests = [], price, barbecueId }: BarbecueGuestsListProps) => {
  return (
    <div className="barbecue-guests-list-container">
      {guests.map(({ id, name, contribution }) => (
        <Guest key={id} id={id} name={name} contribution={contribution} />
      ))}
      <AddGuest barbecueId={barbecueId} price={price} guests={guests} />
    </div>
  );
};

export default BarbecueGuestsList;
