'use client';

import BarbecueCard from '@/components/common/BarbecueCard';
import CreateBarbecueCard from '@/components/common/CreateBarbecueCard';
import { type BarbecueModel } from '@/types/barbecue';
import getBarbecues from '@/utils/api/get-barbecues';
import useSWR from 'swr';

const fetcher = async () => {
  return await getBarbecues();
};

const Home = () => {
  const { data, isLoading, mutate } = useSWR('request', fetcher);

  const { barbecues = [] } = data ?? {};

  const handleMutate = async (newBarbecues: Array<Partial<BarbecueModel>>) => {
    await mutate(
      {
        barbecues: [...barbecues, ...newBarbecues],
      },
      {
        revalidate: false,
      },
    );
  };

  return isLoading ? (
    <div className="home-skeleton">
      <div className="card" />
      <div className="card" />
      <div className="card" />
      <div className="card" />
    </div>
  ) : (
    <div className="home-page">
      {barbecues.map((barbecue) => (
        <BarbecueCard
          key={barbecue._id}
          id={barbecue._id}
          date={barbecue.date}
          name={barbecue.name}
          guests={barbecue.guests.length}
          amountRaised={barbecue.amountRaised}
        />
      ))}
      <CreateBarbecueCard handleMutate={handleMutate} />
    </div>
  );
};

export default Home;
