'use client';

import BarbecueDate from '@/components/common/BarbecueDate';
import BarbecueGuests from '@/components/common/BarbecueGuests';
import BarbecueGuestsList from '@/components/common/BarbecueGuestsList';
import BarbecuePrice from '@/components/common/BarbecuePrice';
import Logo from '@/components/common/Logo';

const Page = () => {
  return (
    <div className="content-container barbecue-page">
      <div className="content-wrapper">
        <div className="details">
          <div className="details-row">
            <BarbecueDate date="23/12" />
            <BarbecueGuests quantity={15} />
          </div>
          <div className="details-row">
            <p className="barbecue-title">Niver do Gui </p>
            <BarbecuePrice price={280} />
          </div>
        </div>

        <BarbecueGuestsList />
      </div>
      <Logo />
    </div>
  );
};

export default Page;
