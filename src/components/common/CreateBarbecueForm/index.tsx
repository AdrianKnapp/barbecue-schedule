import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import BarbecueGuestsList from '../BarbecueGuestsList';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type Inputs = {
  name: string;
  date: string;
  additionalInfo: string;
};

const CreateBarbecueForm = () => {
  const [guests, setGuests] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className="create-barbecue-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="title">Adicionar Churras</h3>
      <InputText
        id="name"
        label="Nome"
        placeholder="Qual o motivo do churrasco?"
        {...register('name', {
          required: true,
        })}
        error={errors.name}
      />
      <InputText
        id="date"
        label="Quando vai ser?"
        type="date"
        {...register('date', {
          required: true,
        })}
        error={errors.date}
      />
      <InputText
        id="additional-info"
        label="Informações adicionais"
        placeholder="Algum adendo?"
        {...register('additionalInfo')}
        error={errors.additionalInfo}
      />
      <p className="guests-list-title">Lista de convidados</p>
      <BarbecueGuestsList guests={guests} />
      <Button type="submit">Concluir</Button>
    </form>
  );
};

export default CreateBarbecueForm;
