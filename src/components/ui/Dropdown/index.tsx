import { Dialog, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { ElementType, Fragment } from 'react';

type ModalProps = {
  button: React.ReactNode;
  children: React.ReactNode;
};

const Dropdown = ({ children, button }: ModalProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">{button}</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <p>Test</p>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
