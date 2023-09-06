import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type BarbecueModel } from '@/types/barbecue';
import createBarbecue from '@/utils/api/create-barbecue';
import { useEffect, useState } from 'react';

type Inputs = {
  name: string;
  date: string;
  description: string;
  priceDrinkIncluded: string;
  priceDrinkNotIncluded: string;
};

type CreateBarbecueFormProps = {
  closeModal: () => void;
  handleMutate: (newBarbecues: Array<Partial<BarbecueModel>>) => void;
};

const CreateBarbecueForm = ({ closeModal, handleMutate }: CreateBarbecueFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true);
      const barbecue: Omit<BarbecueModel, '_id' | 'userId'> = {
        name: data.name,
        date: data.date,
        description: data.description,
        guests: [],
        amountRaised: 0,
        price: {
          drinkIncluded: Number(data.priceDrinkIncluded),
          drinkNotIncluded: Number(data.priceDrinkNotIncluded),
        },
      };

      const response = await createBarbecue({
        barbecue,
      });

      const { barbecue: createdBarbecue } = response;

      if (!createdBarbecue) {
        throw new Error('Não foi possível criar o churrasco');
      }

      closeModal();
      handleMutate([createdBarbecue]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
        defaultValue={new Date().toISOString().slice(0, 10)}
        {...register('date', {
          required: true,
        })}
        error={errors.date}
      />
      <InputText
        id="description"
        label="Informações adicionais"
        placeholder="Algum adendo?"
        {...register('description')}
        error={errors.description}
      />
      <div className="flex gap-5">
        <InputText
          id="price-drink-included"
          label="Valor com bebida inclusa"
          type="tel"
          placeholder="30"
          {...register('priceDrinkIncluded', {
            required: true,
          })}
          error={errors.priceDrinkIncluded}
        />
        <InputText
          id="price-drink-not-included"
          label="Valor sem bebida inclusa"
          type="tel"
          placeholder="20"
          {...register('priceDrinkNotIncluded', {
            required: true,
          })}
          error={errors.priceDrinkNotIncluded}
        />
      </div>
      <Button type="submit" loading={isLoading}>
        Concluir
      </Button>
    </form>
  );
};

export default CreateBarbecueForm;
