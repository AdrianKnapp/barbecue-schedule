import BarbecueCard from '@/components/common/BarbecueCard';
import CreateBarbecueCard from '@/components/common/CreateBarbecueCard';
import getBarbecues from '@/utils/api/get-barbecues';

export const dynamic = 'force-dynamic';

const fetchBarbecues = async () => {
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

  const { barbecues = [] } = data;

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
