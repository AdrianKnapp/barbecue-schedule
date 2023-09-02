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

const Home = async () => {
  const data = await getBarbecues();

  const { barbecues } = data;

  return (
    <div className="content-container home-page">
      <div className="content-wrapper">
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
      <Logo />
    </div>
  );
};

export default Home;
