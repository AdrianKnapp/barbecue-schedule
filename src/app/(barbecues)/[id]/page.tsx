'use client';

import BarbecueDate from '@/components/common/BarbecueDate';
import BarbecueGuests from '@/components/common/BarbecueGuests';
import BarbecueGuestsList from '@/components/common/BarbecueGuestsList';
import BarbecuePrice from '@/components/common/BarbecuePrice';
import Spin from '@/components/ui/Spin';
import { type BarbecueModel } from '@/types/barbecue';
import { useEffect, useState } from 'react';

type PageProps = {
  params: {
    id: string;
  };
};

type BarbecueResponse = {
  barbecue?: BarbecueModel;
};

const getBarbecueById = async (id: string): Promise<BarbecueResponse> => {
  try {
    const response = await fetch(`http://localhost:3000/api/barbecues/${id}`, {
      cache: 'no-cache',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const Page = ({ params }: PageProps) => {
  const { id } = params;

  const [barbecue, setBarbecue] = useState<BarbecueModel | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      const { barbecue } = await getBarbecueById(id);
      setBarbecue(barbecue);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="barbecue-content loading">
        <Spin />
      </div>
    );
  }

  if (!barbecue) {
    window.location.href = '/404';
    return;
  }

  return (
    <div className="barbecue-content">
      <div className="details">
        <div className="details-row">
          <BarbecueDate date={barbecue.date} />
          <BarbecueGuests quantity={barbecue?.guests?.length ?? 0} />
        </div>
        <div className="details-row">
          <p className="barbecue-title">{barbecue.name}</p>
          <BarbecuePrice price={barbecue.amountRaised} />
        </div>
      </div>

      <BarbecueGuestsList price={barbecue.price} barbecue={barbecue} setBarbecue={setBarbecue} />
    </div>
  );
};

export default Page;
