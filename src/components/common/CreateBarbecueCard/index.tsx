import Image from 'next/image';

const CreateBarbecueCard = () => {
  return (
    <div className="create-barbecue-card" tabIndex={0}>
      <div className="create-barbecue-icon-circle">
        <div className="create-barbecue-icon">
          <Image src="/icons/barbecue.svg" alt="price-icon" className="w-full h-full" width={18} height={15.3} />
        </div>
      </div>
      <p className="text">Adicionar Churras</p>
    </div>
  );
};

export default CreateBarbecueCard;
