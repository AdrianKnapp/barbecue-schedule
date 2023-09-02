'use client';

import Guest from './Guest';
import AddGuest from './AddGuest';
import { type Guest as GuestModel } from '@/types/guest';

type BarbecueGuestsListProps = {
  guests: GuestModel[];
};

const BarbecueGuestsList = ({ guests = [] }: BarbecueGuestsListProps) => {
  return (
    <div className="barbecue-guests-list-container">
      {guests.map(({ id, name, contribution }) => (
        <Guest key={id} id={id} name={name} contribution={contribution} />
      ))}
      <AddGuest />
    </div>
  );
};

export default BarbecueGuestsList;
