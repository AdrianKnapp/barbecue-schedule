import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const people = [
  { id: 2, name: 'Valor sem bebida (R$ 20)', unavailable: false },
  { id: 1, name: 'Valor com bebida incluida (R$ 40)', unavailable: false },
];

const AddGuest = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [selected, setSelected] = useState(people[0]);

  const handleToggleEditMode = () => {
    setIsInEditMode((prev) => !prev);
  };

  return isInEditMode ? (
    <div className="editor-container">
      <InputText id="editor" label="Nome" placeholder="Fulano" />
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
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-5 duration-default ${
                        active ? 'bg-gray-100' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {person.name}
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
        <Button>Adicionar</Button>
        <Button variant="outline" onClick={handleToggleEditMode}>
          Cancelar
        </Button>
      </div>
    </div>
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
