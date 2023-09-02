import Link from 'next/link';
import BarbecueDate from '../BarbecueDate';
import BarbecueGuests from '../BarbecueGuests';
import BarbecuePrice from '../BarbecuePrice';

type BarbecueCardProps = {
  id: string;
  date: string;
  name: string;
  guests: number;
  amountRaised: number;
};

const BarbecueCard = ({ id, date, name, guests, amountRaised }: BarbecueCardProps) => {
  return (
    <Link href={`/${id}`} className="barbecue-card">
      <BarbecueDate date={date} />
      <p className="name">{name}</p>
      <div className="infos">
        <BarbecueGuests quantity={guests} />
        <BarbecuePrice price={amountRaised} />
      </div>
    </Link>
  );
};

export default BarbecueCard;
