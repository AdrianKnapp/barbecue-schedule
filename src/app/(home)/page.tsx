import BarbecueCard from '@/components/common/BarbecueCard';
import CreateBarbecueCard from '@/components/common/CreateBarbecueCard';
import Logo from '@/components/common/Logo';
import { Barbecue } from '@/types/barbecue';

type BarbecuesResponse = {
  barbecues: Barbecue[];
};

const getBarbecues = async (): Promise<BarbecuesResponse> => {
  try {
    const response = await fetch(`http://localhost:3000/api/barbecues`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {
      barbecues: [],
    };
  }
};

export const metadata = {
  title: {
    default: 'Agenda de Churras',
    template: '%s | Agenda de Churras',
  },
};

const Home = async () => {
  const data = await getBarbecues();

  const { barbecues } = data;

  return (
    <div className="home-page">
      {barbecues.map((barbecue) => (
        <BarbecueCard
          key={barbecue.id}
          id={barbecue.id}
          date={barbecue.date}
          description={barbecue.description}
          guests={barbecue.guests.length}
          amountRaised={barbecue.amountRaised}
        />
      ))}
      <CreateBarbecueCard />
    </div>
  );
};

export default Home;
