'use client';

import BarbecueDate from '@/components/common/BarbecueDate';
import BarbecueGuests from '@/components/common/BarbecueGuests';
import BarbecueGuestsList from '@/components/common/BarbecueGuestsList';
import BarbecuePrice from '@/components/common/BarbecuePrice';
import Spin from '@/components/ui/Spin';
import { type BarbecueModel } from '@/types/barbecue';
import getBarbecueById from '@/utils/api/get-barbecue-by-id';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

type PageProps = {
  params: {
    id: string;
  };
};

const fetcher = async (id: string) => {
  try {
    const response = await getBarbecueById({
      id,
    });

    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const Page = ({ params }: PageProps) => {
  const { push } = useRouter();

  const { data, isLoading, mutate } = useSWR(params.id, fetcher);

  const { barbecue, error } = data ?? {};

  if (error) {
    if (error && error === 'Unauthorized.') {
      push('/login');
    }
  }

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
        <div className="details-row">
          <p className="barbecue-title">{barbecue.name}</p>
          <BarbecuePrice price={barbecue.amountRaised} />
        </div>
        {barbecue.description && barbecue.description.length > 0 ? (
          <div className="details-row">
            <p className="barbecue-description">{barbecue.description}</p>
          </div>
        ) : null}
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
