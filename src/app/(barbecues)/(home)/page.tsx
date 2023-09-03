import BarbecueCard from '@/components/common/BarbecueCard';
import CreateBarbecueCard from '@/components/common/CreateBarbecueCard';
import { type BarbecueModel } from '@/types/barbecue';
import getBarbecues from '@/utils/api/get-barbecues';

export const dynamic = 'force-dynamic';

type BarbecuesResponse = {
  barbecues: BarbecueModel[];
};

const fetchBarbecues = async (): Promise<BarbecuesResponse> => {
  return await getBarbecues();
};

export const metadata = {
  title: {
    default: 'Agenda de Churras',
    template: '%s | Agenda de Churras',
  },
};

const Home = async () => {
  const data = await fetchBarbecues();

  const { barbecues } = data;

  return (
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
      <CreateBarbecueCard />
    </div>
  );
};

export default Home;
