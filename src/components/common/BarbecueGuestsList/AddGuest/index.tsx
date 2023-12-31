import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import { type BarbecueModel } from '@/types/barbecue';
import { type GuestModel } from '@/types/guest';
import priceFormatter from '@/utils/price-formatter';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
};

type AddGuestProps = {
  price: BarbecueModel['price'];
  barbecueId: string;
  guests: GuestModel[];
  setGuests: (newGuest: GuestModel) => void;
};

const AddGuest = ({ price, barbecueId, guests, setGuests }: AddGuestProps) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { drinkIncluded, drinkNotIncluded } = price;

  const priceOptions = [
    {
      value: price.drinkNotIncluded,
      name: `${priceFormatter.format(drinkNotIncluded)} (sem bebidas inclusas)`,
    },
    {
      value: price.drinkIncluded,
      name: `${priceFormatter.format(drinkIncluded)} (com bebidas inclusas)`,
    },
  ];

  const [selected, setSelected] = useState(priceOptions[0]);

  const handleEnableEditMode = () => {
    setIsInEditMode(true);
    setFocus('name');
  };

  const handleDisableEditMode = () => {
    setIsInEditMode(false);

    if (document.activeElement && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (fields) => {
    try {
      setIsLoading(true);
      const newGuest: GuestModel = {
        id: `${guests.length + 1}`,
        name: fields.name,
        contribution: selected.value,
        paid: false,
      };

      const data: Pick<BarbecueModel, 'guests'> = {
        guests: [...guests, newGuest],
      };

      await fetch(`/api/barbecues/${barbecueId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });

      reset();
      setGuests(newGuest);
    } catch (err) {
      console.error(err);
    } finally {
      handleDisableEditMode();
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={`editor-container ${isInEditMode ? 'active' : ''}`}>
        <InputText
          id="name"
          label="Nome"
          placeholder="Pedro"
          {...register('name', {
            required: true,
          })}
          tabIndex={!isInEditMode ? -1 : 0}
          error={errors.name}
        />
        <div className="select-contribution">
          <p className="select-contribution-title">Contribuição</p>
          <Listbox value={selected} onChange={setSelected} disabled={!isInEditMode}>
            <div className="relative mt-1">
              <Listbox.Button className="py-3.5 px-5 font-size-small pr-10 border border-dark-default w-full text-left focus:ring-2 ring-dark-default outline-none aria-expanded:ring-2">
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
                <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto bg-white border border-dark-default shadow-xl outline-none">
                  {priceOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
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
          <Button type="button" variant="outline" onClick={handleDisableEditMode} disabled={!isInEditMode}>
            Cancelar
          </Button>
          <Button type="submit" loading={isLoading} disabled={!isInEditMode}>
            Adicionar
          </Button>
        </div>
      </form>
      <div
        className={`add-guest-wrapper ${isInEditMode ? '' : 'active'}`}
        onClick={handleEnableEditMode}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleEnableEditMode();
        }}
      >
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
    </>
  );
};

export default AddGuest;
