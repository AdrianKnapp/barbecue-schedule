import Image from 'next/image';

type BarbecueGuestsProps = {
  quantity: number;
};

const BarbecueGuests = ({ quantity }: BarbecueGuestsProps) => {
  return (
    <div className="barbecue-guests">
      <div className="guests-icon">
        <Image src="/icons/people.svg" alt="guests-icon" className="w-full h-full" width={18} height={15.3} />
      </div>
      <p className="guests-quantity">{quantity}</p>
    </div>
  );
};

export default BarbecueGuests;
