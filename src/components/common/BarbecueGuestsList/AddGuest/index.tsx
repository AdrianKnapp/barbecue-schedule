import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import { Barbecue } from '@/types/barbecue';
import { Guest } from '@/types/guest';
import priceFormatter from '@/utils/price-formatter';
import { Listbox, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
};

type AddGuestProps = {
  price: Barbecue['price'];
  barbecueId: string;
  guests: Guest[];
};

const AddGuest = ({ price, barbecueId, guests }: AddGuestProps) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const priceOptions = [
    {
      id: 1,
      value: price.drinkNotIncluded,
      name: `Preço sem bebida incluída (${priceFormatter.format(price.drinkNotIncluded)})`,
    },
    {
      id: 2,
      value: price.drinkIncluded,
      name: `Preço com bebida incluída (${priceFormatter.format(price.drinkIncluded)})`,
    },
  ];

  const [selected, setSelected] = useState(priceOptions[0]);

  const handleToggleEditMode = () => {
    setIsInEditMode((prev) => !prev);
  };

  const onSubmit: SubmitHandler<Inputs> = async (fields) => {
    try {
      const newGuest = {
        id: Math.random().toString(36).substr(2, 9),
        name: fields.name,
        contribution: selected.value,
        paid: false,
      } as Guest;

      const data = {
        guests: [...guests, newGuest],
      } as Pick<Barbecue, 'guests'>;

      await fetch(`/api/barbecues/${barbecueId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });

      router.refresh();
    } catch (err) {
      console.error(err);
    }
    handleToggleEditMode();
  };

  return isInEditMode ? (
    <form onSubmit={handleSubmit(onSubmit)} className="editor-container">
      <InputText
        id="name"
        label="Nome"
        placeholder="Pedro"
        {...register('name', {
          required: true,
        })}
        error={errors.name}
      />
      <div className="select-contribution">
        <p className="select-contribution-title">Contribuição</p>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="py-3.5 px-5 border border-dark-default w-full text-left focus:ring-2 ring-dark-default outline-none aria-expanded:ring-2">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto bg-white border border-dark-default shadow-xl">
                {priceOptions.map((option, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-5 duration-default ${
                        active ? 'bg-gray-100' : 'text-gray-900'
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {option.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <div className="editor-button-group">
        <Button variant="outline" onClick={handleToggleEditMode}>
          Cancelar
        </Button>
        <Button type="submit">Adicionar</Button>
      </div>
    </form>
  ) : (
    <div className="add-guest-wrapper" onClick={handleToggleEditMode}>
      <div className="add-guest-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
      <p className="add-guest-text">Adicionar convidado</p>
    </div>
  );
};

export default AddGuest;
