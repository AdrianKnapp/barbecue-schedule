import BarbecueCard from '@/components/common/BarbecueCard';
import Logo from '@/components/common/Logo';

const Home = () => {
  return (
    <div className="content-container">
      <div className="barbecues-wrapper">
        <BarbecueCard date="01/12" description="Niver do Gui" guests={12} price={340} />
        <BarbecueCard date="23/12" description="Final de Ano" guests={12} price={340} />
        <BarbecueCard date="06/01" description="Sem motivo" guests={12} price={340} />
      </div>
      <Logo />
    </div>
  );
};

export default Home;
