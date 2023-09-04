'use client';

import Guest from './Guest';
import AddGuest from './AddGuest';
import { type GuestModel } from '@/types/guest';
import { type BarbecueModel } from '@/types/barbecue';
import { type ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '@/utils/use-debounce';
import getAmountRaised from '@/utils/get-amount-raised';
import updateBarbecue from '@/utils/api/update-barbecue';

type BarbecueGuestsListProps = {
  price: BarbecueModel['price'];
  barbecueId: BarbecueModel['_id'];
  barbecueGuests: BarbecueModel['guests'];
  refreshBarbecue: (newBarbecue: Partial<BarbecueModel>) => void;
};

const BarbecueGuestsList = ({ price, barbecueGuests, barbecueId, refreshBarbecue }: BarbecueGuestsListProps) => {
  const [guests, setGuests] = useState<GuestModel[]>(barbecueGuests);

  const debouncedGuests = useDebounce(guests, 500);

  useEffect(() => {
    if (!guests) return;

    void (async () => {
      await updateBarbecue({
        id: barbecueId,
        barbecue: {
          guests: debouncedGuests,
          amountRaised: getAmountRaised(debouncedGuests),
        },
      });
    })();
  }, [debouncedGuests]);

  const handleUpdateGuests = (newGuest: GuestModel) => {
    const newGuests = [...guests, newGuest];

    setGuests([...guests, newGuest]);
    refreshBarbecue({
      guests: newGuests,
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    const guestIndex = guests.findIndex((guest) => guest.id === id);

    if (guestIndex === -1) return;

    const newGuests = [...guests];

    newGuests[guestIndex] = {
      ...newGuests[guestIndex],
      paid: checked,
    };

    setGuests(newGuests);
    refreshBarbecue({
      guests: [...newGuests],
      amountRaised: getAmountRaised(newGuests),
    });
  };

  const handleDeleteGuest = (guestId: GuestModel['id']) => {
    const guestIndex = guests.findIndex((guest) => guest.id === guestId);

    const newGuests = [...guests];

    newGuests.splice(guestIndex, 1);

    setGuests(newGuests);
    refreshBarbecue({
      guests: [...newGuests],
      amountRaised: getAmountRaised(newGuests),
    });
  };

  return (
    <div className="barbecue-guests-list-container">
      {guests.map((guest) => (
        <Guest
          key={guest.id}
          guest={guest}
          handleCheckboxChange={handleCheckboxChange}
          handleDeleteGuest={handleDeleteGuest}
        />
      ))}
      <AddGuest barbecueId={barbecueId} price={price} guests={guests} setGuests={handleUpdateGuests} />
    </div>
  );
};

export default BarbecueGuestsList;
