import Link from 'next/link';
import BarbecueDate from '../BarbecueDate';
import BarbecueGuests from '../BarbecueGuests';
import BarbecuePrice from '../BarbecuePrice';

type BarbecueCardProps = {
  date: string;
  description: string;
  guests: number;
  price: number;
};

const BarbecueCard = ({ date, description, guests, price }: BarbecueCardProps) => {
  return (
    <Link href="/123" className="barbecue-card">
      <BarbecueDate date={date} />
      <p className="description">{description}</p>
      <div className="infos">
        <BarbecueGuests quantity={guests} />
        <BarbecuePrice price={price} />
      </div>
    </Link>
  );
};

export default BarbecueCard;
