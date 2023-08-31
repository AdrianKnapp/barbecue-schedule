import Image from 'next/image';

type BarbecuePriceProps = {
  price: number;
};

const currencyBrl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
});

const BarbecuePrice = ({ price }: BarbecuePriceProps) => {
  return (
    <div className="barbecue-price">
      <div className="price-icon">
        <Image src="/icons/money.svg" alt="price-icon" className="w-full h-full" width={18} height={15.3} />
      </div>
      <p className="price">{currencyBrl.format(price)}</p>
    </div>
  );
};

export default BarbecuePrice;
