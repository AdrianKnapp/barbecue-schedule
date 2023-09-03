import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { type BarbecueModel } from '@/types/barbecue';
import createBarbecue from '@/utils/api/create-barbecue';

type Inputs = {
  name: string;
  date: string;
  description: string;
  priceDrinkIncluded: string;
  priceDrinkNotIncluded: string;
};

type CreateBarbecueFormProps = {
  closeModal: () => void;
};

const CreateBarbecueForm = ({ closeModal }: CreateBarbecueFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const barbecue: Omit<BarbecueModel, '_id' | 'amountRaised' | 'userId'> = {
        name: data.name,
        date: data.date,
        description: data.description,
        guests: [],
        price: {
          drinkIncluded: Number(data.priceDrinkIncluded),
          drinkNotIncluded: Number(data.priceDrinkNotIncluded),
        },
      };

      await createBarbecue({
        barbecue,
      });

      closeModal();
      router.refresh();
    } catch (err) {
      console.error(err);
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
      <Button type="submit">Concluir</Button>
    </form>
  );
};

export default CreateBarbecueForm;
