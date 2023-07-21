import { useState, useEffect } from 'react';
import { Combobox, Transition } from "@headlessui/react";
import { Check, NavArrowDown } from "iconoir-react";
import { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
import PetAvatar from "../PetAvatar";
import { Pet } from "../pets";
import { useAuth } from "@clerk/nextjs";

export default function PetCombobox({ defaultIds } : { defaultIds : any }) {

  const [pets, setPets] = useState<any>([]);
  const [ selectedPets, setSelectedPets ] = useState<any>([]);

  const { userId, getToken } = useAuth();

  useEffect(() => {
    fetchData();

  }, []);

  const fetchData = async () => {
    const token = await getToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/current-user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    setPets(data);
  }

  return (
    <div className="">
      <Field name="attendees" as="select" multiple>
        {({ field, form }: { field: any, form: any }) => {
          const { value } = field;
          const { setFieldValue } = form;

          const filteredPets = field.value === "" ? pets || [] : (pets || []).filter((pet: any) => pet.name);

          const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            // const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
            //   option.value
            // );
            // setFieldValue("attendees", selectedOptions);
            // setSelectedPets(selectedOptions);

            console.log(value);
          };

          const handleComboboxChange = (selectedPets: string[]) => {
            // setFieldValue("attendees", selectedPets);

            console.log(value);
          };

          return (
            <>
              <Combobox value={value} onChange={handleComboboxChange}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                      displayValue={(pet: any) => pet.name}
                      onChange={(event) => setFieldValue("attendees", event.target.value)}
                      {...field}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <NavArrowDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setFieldValue("attendees", [])}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredPets.length === 0 && field.value !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredPets.map((pet: any) => (
                          <Combobox.Option onClick={(e) => handleInputChange(e)}
                            key={pet.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`
                            }
                            value={pet.id.toString()}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate flex flex-row space-x-2 ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  <PetAvatar imgId={pet.avatar} width={35} height={35} format='jpg' isRounded /> {pet.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}
                                  >
                                    <Check className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
              {/* <div className="flex space-x-2 mt-2">
                {selectedPets.map((pet: any) => (
                    <div>
                      {pet.name}
                    </div>
// <PetAvatar key={petId} imgId={pets.find((pet: any) => pet.id === petId)?.avatar} width={35} height={35} format='jpg' isRounded />
                ))}
              </div> */}
            </>
          );
        }}
      </Field>
      <ErrorMessage name="attendees" component="div" className="text-red-500 mt-1" />
    </div>
  );
}
