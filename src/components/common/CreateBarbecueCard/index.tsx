'use client';

import Modal from '@/components/ui/Modal';
import Image from 'next/image';
import { useState } from 'react';
import CreateBarbecueForm from '../CreateBarbecueForm';
import { type BarbecueModel } from '@/types/barbecue';

type CreateBarbecueCardProps = {
  handleMutate: (newBarbecues: Array<Partial<BarbecueModel>>) => void;
};

const CreateBarbecueCard = ({ handleMutate }: CreateBarbecueCardProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="create-barbecue-card" tabIndex={0} onClick={handleOpenModal}>
      <div className="create-barbecue-icon-circle">
        <div className="create-barbecue-icon">
          <Image src="/icons/barbecue.svg" alt="price-icon" className="w-full h-full" width={18} height={15.3} />
        </div>
      </div>
      <p className="text">Adicionar Churras</p>
      <Modal isOpen={modalIsOpen} closeModal={handleCloseModal}>
        <CreateBarbecueForm closeModal={handleCloseModal} handleMutate={handleMutate} />
      </Modal>
    </div>
  );
};

export default CreateBarbecueCard;
