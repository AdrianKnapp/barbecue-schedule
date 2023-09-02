import BarbecueDate from '@/components/common/BarbecueDate';
import BarbecueGuests from '@/components/common/BarbecueGuests';
import BarbecueGuestsList from '@/components/common/BarbecueGuestsList';
import BarbecuePrice from '@/components/common/BarbecuePrice';
import Logo from '@/components/common/Logo';
import { Barbecue } from '@/types/barbecue';

type PageProps = {
  params: {
    barbecueId: string;
  };
};

type BarbecueResponse = {
  barbecue?: Barbecue;
};

export const generateMetadata = () => {
  return {
    title: 'Barbecue',
    description: 'Barbecue description',
    image: 'https://barbecue.com/image.png',
  };
};

const getBarbecueById = async (id: string): Promise<BarbecueResponse> => {
  try {
    const response = await fetch(`http://localhost:3000/api/barbecues/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const Page = async ({ params }: PageProps) => {
  const { barbecue } = await getBarbecueById(params.barbecueId);

  if (!barbecue) {
    return (
      <div>
        <p>Barbecue not found.</p>
      </div>
    );
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

      <BarbecueGuestsList guests={barbecue.guests} price={barbecue.price} barbecueId={barbecue._id} />
    </div>
  );
};

export default Page;
