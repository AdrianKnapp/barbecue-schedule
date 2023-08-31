import Image from 'next/image';

const Logo = () => {
  return (
    <div className="logo-wrapper">
      <Image src="/logo.svg" alt="logo" className="logo" width={48} height={48} />
    </div>
  );
};

export default Logo;
