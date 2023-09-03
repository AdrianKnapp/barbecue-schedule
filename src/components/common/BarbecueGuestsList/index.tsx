'use client';

import Guest from './Guest';
import AddGuest from './AddGuest';
import { type GuestModel } from '@/types/guest';
import { type BarbecueModel } from '@/types/barbecue';
import { type ChangeEvent, useEffect, type SetStateAction, type Dispatch } from 'react';
import useDebounce from '@/utils/use-debounce';
import getAmountRaised from '@/utils/get-amount-raised';

type BarbecueGuestsListProps = {
  price: BarbecueModel['price'];
  barbecue: BarbecueModel;
  setBarbecue: Dispatch<SetStateAction<BarbecueModel | undefined>>;
};

type UpdateBarbecueProps = {
  id: string;
  barbecue: BarbecueModel;
};

const updateBarbecue = async ({ id, barbecue }: UpdateBarbecueProps) => {
  try {
    await fetch(`/api/barbecues/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...barbecue,
        amountRaised: getAmountRaised(barbecue.guests),
      }),
    });
  } catch (err) {
    console.error(err);
  }
};

const BarbecueGuestsList = ({ price, barbecue, setBarbecue }: BarbecueGuestsListProps) => {
  const { _id: barbecueId, guests } = barbecue;

  const debouncedGuests = useDebounce(guests, 500);

  useEffect(() => {
    if (!guests) return;

    void (async () => {
      try {
        await updateBarbecue({ id: barbecueId, barbecue });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [debouncedGuests]);

  const handleUpdateGuests = (newGuest: GuestModel) => {
    if (!guests) return;

    setBarbecue((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        guests: [...prev.guests, newGuest],
      };
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    if (!barbecue || !guests) return;

    const guestIndex = guests.findIndex((guest) => guest.id === id);

    if (guestIndex === -1) return;

    const newGuests = [...guests];

    newGuests[guestIndex] = {
      ...newGuests[guestIndex],
      paid: checked,
    };

    setBarbecue((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        guests: [...newGuests],
        amountRaised: getAmountRaised(newGuests),
      };
    });
  };

  return (
    <div className="barbecue-guests-list-container">
      {guests.map((guest) => (
        <Guest key={guest.id} guest={guest} handleCheckboxChange={handleCheckboxChange} />
      ))}
      <AddGuest barbecueId={barbecueId} price={price} guests={guests} setGuests={handleUpdateGuests} />
    </div>
  );
};

export default BarbecueGuestsList;
