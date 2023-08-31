import Image from 'next/image';

const HeaderImage = () => {
  return (
    <div className="header-image-container">
      <Image src="/barbecue-pattern.svg" alt="background-pattern" className="w-full h-full" width={200} height={200} />
    </div>
  );
};

export default HeaderImage;
