'use client';

import BarbecueDate from '@/components/common/BarbecueDate';
import BarbecueGuests from '@/components/common/BarbecueGuests';
import BarbecueGuestsList from '@/components/common/BarbecueGuestsList';
import BarbecuePrice from '@/components/common/BarbecuePrice';
import Spin from '@/components/ui/Spin';
import { type BarbecueModel } from '@/types/barbecue';
import getBarbecueById from '@/utils/api/get-barbecue-by-id';
import useSWR from 'swr';

type PageProps = {
  params: {
    id: string;
  };
};

const fetcher = async (id: string) => {
  return await getBarbecueById(id);
};

const Page = ({ params }: PageProps) => {
  const { data, isLoading, mutate } = useSWR(params.id, fetcher);

  const { barbecue } = data ?? {};

  const refreshBarbecue = async (newBarbecue: Partial<BarbecueModel>) => {
    await mutate(
      {
        barbecue: {
          ...barbecue,
          ...newBarbecue,
        },
      },
      {
        revalidate: false,
      },
    );
  };

  if (isLoading) {
    return (
      <div className="barbecue-content loading">
        <Spin />
      </div>
    );
  }

  if (!barbecue) {
    return <div>No date available</div>;
  }

  return (
    <div className="barbecue-content">
      <div className="details">
        <div className="details-row">
          <BarbecueDate date={barbecue.date} />
          <BarbecueGuests quantity={barbecue?.guests?.length ?? 0} />
        </div>
        <div className="details-row name-price">
          <p className="barbecue-title">{barbecue.name}</p>
          <BarbecuePrice price={barbecue.amountRaised} />
        </div>
      </div>

      <BarbecueGuestsList
        price={barbecue.price}
        barbecueGuests={barbecue.guests}
        barbecueId={barbecue._id}
        refreshBarbecue={refreshBarbecue}
      />
    </div>
  );
};

export default Page;
