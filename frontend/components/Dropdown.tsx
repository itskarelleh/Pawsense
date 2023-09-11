import { useState } from 'react';
import { Popover } from '@headlessui/react';

const Dropdown = ({ children } : { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="relative my-32">
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button>
                <button
                  onClick={toggleDropdown}
                  className="relative z-10 block rounded-md bg-white p-2 focus:outline-none"
                >
                  <svg
                    className="h-5 w-5 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Popover.Button>

              <Popover.Panel
                className={`${
                  open ? 'block' : 'hidden'
                } absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20`}
              >
                {children}
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default Dropdown;
